import { 
  type JetBlueCalculatorInput, 
  type JetBlueCalculationResults, 
  type JetBlueTierStatus,
  JETBLUE_TIER_CONFIGS,
  JETBLUE_FARE_TYPES,
  JETBLUE_CREDIT_CARDS
} from "@shared/jetblue-schema";

const POINT_VALUE = 0.0145; // 1.45¢ per point
const BAG_VALUE = 35; // $35 per checked bag

export function calculateJetBlueRewards(input: JetBlueCalculatorInput): JetBlueCalculationResults {
  const { 
    flightSpending, 
    fareType,
    currentTier, 
    segments,
    creditCard,
    cardSpending,
    includeSignUpBonus,
    partnerSpending
  } = input;

  const tierConfig = JETBLUE_TIER_CONFIGS[currentTier];
  const fareTypeConfig = JETBLUE_FARE_TYPES[fareType];
  const cardConfig = JETBLUE_CREDIT_CARDS[creditCard];
  
  // ======================
  // POINTS CALCULATION
  // ======================
  
  // Flight points based on tier multiplier
  const flightPoints = flightSpending * tierConfig.pointsMultiplier;
  
  // Add credit card bonus on JetBlue purchases
  let totalFlightPoints = flightPoints;
  if (creditCard !== "none") {
    totalFlightPoints += flightSpending * cardConfig.flightPointsBonus;
  }
  
  // Credit card points from non-airline spending
  let creditCardPoints = cardSpending * cardConfig.purchaseMultiplier;
  
  // Sign-up bonus (if qualified)
  const totalCardSpend = creditCard !== "none" ? cardSpending : 0;
  if (includeSignUpBonus && totalCardSpend >= cardConfig.signUpSpendRequirement) {
    creditCardPoints += cardConfig.signUpBonus;
  }
  
  // Annual bonus
  if (creditCard !== "none" && cardConfig.annualBonus > 0) {
    creditCardPoints += cardConfig.annualBonus;
  }
  
  // Partner points (hotels, car rentals, etc.)
  const partnerPoints = partnerSpending * 2; // Assume 2x points on partners
  
  // Total points
  const totalPoints = totalFlightPoints + creditCardPoints + partnerPoints;
  
  // ======================
  // MOSAIC QUALIFICATION
  // ======================
  
  // Calculate tiles (only for eligible fares)
  let tilesEarned = 0;
  if (fareTypeConfig.tileEligible) {
    if (fareType === "mint") {
      // Mint earns 3 tiles per segment
      tilesEarned = segments * 3;
    } else if (fareType === "blue-extra" || fareType === "blue-plus") {
      // Premium fares earn 2 tiles per segment sometimes
      tilesEarned = Math.floor(segments * 1.5);
    } else if (fareType === "blue") {
      // Regular Blue earns 1 tile per segment
      tilesEarned = segments;
    }
  }
  
  // Add Mosaic Boost from credit card (if applicable)
  const mosaicBoostApplied = creditCard !== "none" && cardConfig.mosaicBoost;
  if (mosaicBoostApplied && totalCardSpend >= 50000) {
    // Cards can provide bonus tiles for high spending
    tilesEarned += 10;
  }
  
  const segmentsFlown = segments;
  
  // ======================
  // STATUS PROGRESSION
  // ======================
  
  // Determine next tier
  const tiers: JetBlueTierStatus[] = ["basic", "trueblue", "mosaic", "mosaic-plus", "mosaic-elite"];
  const currentTierIndex = tiers.indexOf(currentTier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  
  let tilesToNextTier = 0;
  let segmentsToNextTier = 0;
  let percentToNextTier = 0;
  
  if (nextTier) {
    const nextTierConfig = JETBLUE_TIER_CONFIGS[nextTier];
    const currentRequirement = JETBLUE_TIER_CONFIGS[currentTier].tilesRequired;
    const nextRequirement = nextTierConfig.tilesRequired;
    
    tilesToNextTier = Math.max(0, nextRequirement - tilesEarned);
    segmentsToNextTier = Math.max(0, nextTierConfig.segmentsRequired - segmentsFlown);
    
    // Calculate percentage progress (based on tiles)
    if (nextRequirement > 0) {
      const tierRange = nextRequirement - currentRequirement;
      const progress = tilesEarned - currentRequirement;
      percentToNextTier = Math.min(100, Math.max(0, (progress / tierRange) * 100));
    }
  }
  
  // ======================
  // FINANCIAL ANALYSIS
  // ======================
  
  const pointsValue = totalPoints * POINT_VALUE;
  
  // Calculate value of free checked bags (if card held)
  const freeCheckedBagValue = creditCard !== "none" && cardConfig.freeCheckedBag ? 
    segments * BAG_VALUE : 0;
  
  const totalSpend = flightSpending + cardSpending + partnerSpending;
  const totalValue = pointsValue + freeCheckedBagValue;
  const returnOnSpend = totalSpend > 0 ? (totalValue / totalSpend) * 100 : 0;
  
  return {
    // Points breakdown
    totalPoints: Math.round(totalPoints),
    flightPoints: Math.round(totalFlightPoints),
    creditCardPoints: Math.round(creditCardPoints),
    partnerPoints: Math.round(partnerPoints),
    
    // Mosaic qualification
    tilesEarned,
    segmentsFlown,
    
    // Status progress
    currentTier,
    nextTier,
    tilesToNextTier,
    segmentsToNextTier,
    percentToNextTier: Math.round(percentToNextTier),
    
    // Financial analysis
    pointsValue: Math.round(pointsValue * 100) / 100,
    returnOnSpend: Math.round(returnOnSpend * 10) / 10,
    
    // Special benefits
    freeCheckedBagValue: Math.round(freeCheckedBagValue),
    mosaicBoostApplied,
  };
}