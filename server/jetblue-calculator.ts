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
  
  // Base points from fare type
  const baseFlightPoints = flightSpending * fareTypeConfig.basePoints;
  
  // Add Mosaic bonus if member has Mosaic status
  const mosaicBonusPoints = flightSpending * tierConfig.mosaicBonus;
  
  // Total flight points before credit card bonus
  const flightPoints = baseFlightPoints + mosaicBonusPoints;
  
  // Add credit card bonus on JetBlue purchases
  let totalFlightPoints = flightPoints;
  if (creditCard !== "none") {
    totalFlightPoints += flightSpending * cardConfig.flightPointsBonus;
  }
  
  // Credit card points from non-airline spending
  let creditCardPoints = 0;
  
  if (creditCard !== "none") {
    creditCardPoints = cardSpending * cardConfig.purchaseMultiplier;
    
    // Sign-up bonus (if qualified)
    const totalCardSpend = cardSpending;
    if (includeSignUpBonus && totalCardSpend >= cardConfig.signUpSpendRequirement) {
      creditCardPoints += cardConfig.signUpBonus;
    }
    
    // Annual bonus
    if (cardConfig.annualBonus > 0) {
      creditCardPoints += cardConfig.annualBonus;
    }
  }
  
  // Partner points (hotels, car rentals, etc.)
  const partnerPoints = partnerSpending * 2; // Assume 2x points on partners
  
  // Total points
  const totalPoints = totalFlightPoints + creditCardPoints + partnerPoints;
  
  // ======================
  // MOSAIC QUALIFICATION
  // ======================
  
  // Calculate tiles - 1 tile = $100 spent on JetBlue travel (only for eligible fares)
  let tilesEarnedFromFlights = 0;
  if (fareTypeConfig.tileEligible) {
    tilesEarnedFromFlights = Math.floor(flightSpending / 100);
  }
  
  // Credit card spending can also earn tiles - 1 tile = $1,000 spent
  let tilesEarnedFromCreditCard = 0;
  const mosaicBoostApplied = creditCard !== "none" && cardConfig.mosaicBoost;
  if (mosaicBoostApplied) {
    tilesEarnedFromCreditCard = Math.floor(cardSpending / 1000);
  }
  
  const tilesEarned = tilesEarnedFromFlights + tilesEarnedFromCreditCard;
  
  // No segments requirement anymore
  const segmentsFlown = segments; // Kept for backward compatibility but not used for qualification
  
  // ======================
  // STATUS PROGRESSION
  // ======================
  
  // Determine next tier
  const tiers: JetBlueTierStatus[] = ["trueblue", "mosaic-1", "mosaic-2", "mosaic-3", "mosaic-4"];
  const currentTierIndex = tiers.indexOf(currentTier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  
  let tilesToNextTier = 0;
  let segmentsToNextTier = 0; // No longer used but kept for backward compatibility
  let percentToNextTier = 0;
  
  if (nextTier) {
    const nextTierConfig = JETBLUE_TIER_CONFIGS[nextTier];
    const currentRequirement = JETBLUE_TIER_CONFIGS[currentTier].tilesRequired;
    const nextRequirement = nextTierConfig.tilesRequired;
    
    tilesToNextTier = Math.max(0, nextRequirement - tilesEarned);
    segmentsToNextTier = 0; // No segments requirement anymore
    
    // Calculate percentage progress (based on tiles only)
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
  
  // Calculate value of free checked bags (if card held) - informational only, not included in value analysis
  const freeCheckedBagValue = creditCard !== "none" && cardConfig.freeCheckedBag ? 
    segments * BAG_VALUE : 0;
  
  // Include credit card annual fee in total cost
  const totalCost = flightSpending + (creditCard !== "none" ? cardSpending + cardConfig.annualFee : 0) + partnerSpending;
  const returnOnSpend = totalCost > 0 ? (pointsValue / totalCost) * 100 : 0;
  
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
    totalCost: Math.round(totalCost * 100) / 100,
    returnOnSpend: Math.round(returnOnSpend * 10) / 10,
    
    // Special benefits
    freeCheckedBagValue: Math.round(freeCheckedBagValue),
    mosaicBoostApplied,
  };
}