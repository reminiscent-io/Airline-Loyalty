import { 
  type AtmosCalculatorInput, 
  type AtmosCalculationResults, 
  type AtmosTierStatus,
  type AtmosEarningMethod,
  ATMOS_TIER_CONFIGS,
  ATMOS_FARE_CLASSES,
  ATMOS_CREDIT_CARDS
} from "@shared/atmos-schema";

const POINT_VALUE = 0.016; // 1.6¢ per point (Alaska/Hawaiian average)
const BAG_VALUE = 35; // $35 per checked bag
const LOUNGE_PASS_VALUE = 50; // $50 per lounge pass

export function calculateAtmosRewards(input: AtmosCalculatorInput): AtmosCalculationResults {
  const { 
    earningMethod,
    flightSpending, 
    flightDistance,
    segments,
    fareClass,
    isInternational,
    currentTier, 
    creditCard,
    cardSpending,
    includeSignUpBonus,
    partnerSpending,
    awardPointsRedeemed,
    community
  } = input;

  const tierConfig = ATMOS_TIER_CONFIGS[currentTier];
  const fareClassConfig = ATMOS_FARE_CLASSES[fareClass];
  const cardConfig = ATMOS_CREDIT_CARDS[creditCard];
  
  // ======================
  // BASE EARNING CALCULATION (2026 Methods)
  // ======================
  
  let baseRedeemablePoints = 0;
  let baseStatusPoints = 0;
  let baseEarningRate = "";
  
  switch (earningMethod) {
    case "distance":
      // 1 point per mile flown
      baseRedeemablePoints = flightDistance;
      baseStatusPoints = flightDistance;
      baseEarningRate = "1 point per mile";
      break;
      
    case "spend":
      // 5 points per $1 spent
      baseRedeemablePoints = flightSpending * 5;
      baseStatusPoints = flightSpending * 5;
      baseEarningRate = "5 points per $1";
      break;
      
    case "segment":
      // 500 points per segment
      baseRedeemablePoints = segments * 500;
      baseStatusPoints = segments * 500;
      baseEarningRate = "500 points per segment";
      break;
  }
  
  // Apply fare class multiplier (percentage of base)
  const fareClassMultiplier = fareClassConfig.basePoints / 100;
  baseRedeemablePoints *= fareClassMultiplier;
  baseStatusPoints *= fareClassMultiplier;
  
  // Special handling for international first class (350% instead of 200%)
  if (isInternational && fareClass === "F") {
    baseRedeemablePoints *= 1.75; // Additional 75% to get from 200% to 350%
    baseStatusPoints *= 1.75;
  }
  
  // ======================
  // ELITE TIER BONUS (Multiplicative for 2026)
  // ======================
  
  const flightRedeemablePoints = baseRedeemablePoints * tierConfig.redeemablePointsMultiplier;
  const flightStatusPoints = baseStatusPoints; // Status points don't get tier bonuses
  
  // ======================
  // CREDIT CARD POINTS
  // ======================
  
  let creditCardRedeemablePoints = 0;
  let creditCardStatusPoints = 0;
  
  if (creditCard !== "none") {
    // Redeemable points from general spending
    const baseCardPoints = cardSpending * cardConfig.otherPointsMultiplier;
    
    // Add airline purchase bonus
    const airlineBonus = flightSpending * cardConfig.airlinePointsMultiplier;
    
    creditCardRedeemablePoints = baseCardPoints + airlineBonus;
    
    // Status points from card spending
    if (cardConfig.statusPointsPerDollar > 0) {
      creditCardStatusPoints = (cardSpending + flightSpending) * cardConfig.statusPointsPerDollar;
      
      // Apply cap if exists (though no caps in 2026)
      if (cardConfig.statusPointsCap && creditCardStatusPoints > cardConfig.statusPointsCap) {
        creditCardStatusPoints = cardConfig.statusPointsCap;
      }
      
      // Add anniversary bonus
      creditCardStatusPoints += cardConfig.anniversaryBonus;
    }
    
    // Sign-up bonus (redeemable points only)
    if (includeSignUpBonus && cardSpending >= cardConfig.signUpSpendRequirement) {
      creditCardRedeemablePoints += cardConfig.signUpBonus;
    }
  }
  
  // ======================
  // PARTNER & AWARD REDEMPTION POINTS
  // ======================
  
  // Partner flights (assume base rate without tier bonus)
  const partnerRedeemablePoints = partnerSpending * 5;
  
  // Status points from award redemptions (1 per 20 points redeemed, spend-based only)
  const awardRedemptionStatusPoints = earningMethod === "spend" ? 
    Math.floor(awardPointsRedeemed / 20) : 0;
  
  // ======================
  // TOTALS
  // ======================
  
  const totalRedeemablePoints = flightRedeemablePoints + creditCardRedeemablePoints + partnerRedeemablePoints;
  const totalStatusPoints = flightStatusPoints + creditCardStatusPoints + awardRedemptionStatusPoints;
  
  // ======================
  // STATUS PROGRESSION
  // ======================
  
  const tiers: AtmosTierStatus[] = ["member", "silver", "gold", "platinum", "titanium"];
  const currentTierIndex = tiers.indexOf(currentTier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  
  let statusPointsToNextTier = 0;
  let percentToNextTier = 0;
  let headStartBonus = 0;
  
  if (nextTier) {
    const nextTierConfig = ATMOS_TIER_CONFIGS[nextTier];
    const currentRequirement = tierConfig.statusPointsRequired;
    const nextRequirement = nextTierConfig.statusPointsRequired;
    
    statusPointsToNextTier = Math.max(0, nextRequirement - totalStatusPoints);
    
    // Calculate percentage progress
    const tierRange = nextRequirement - currentRequirement;
    const progress = totalStatusPoints - currentRequirement;
    percentToNextTier = Math.min(100, Math.max(0, (progress / tierRange) * 100));
  }
  
  // 2026 Head Start Bonus (for 2025 Platinum/Titanium members)
  if (currentTier === "platinum") {
    headStartBonus = 5000;
  } else if (currentTier === "titanium") {
    headStartBonus = 20000;
  }
  
  // ======================
  // FINANCIAL ANALYSIS
  // ======================
  
  const pointsValue = totalRedeemablePoints * POINT_VALUE;
  
  // Calculate value of benefits
  const freeCheckedBagValue = creditCard !== "none" && cardConfig.freeCheckedBag ? 
    segments * BAG_VALUE : 0;
    
  const loungeAccessValue = creditCard === "summit" ? 
    8 * LOUNGE_PASS_VALUE : 0; // 8 passes per year
  
  // Calculate return on spend
  const totalCost = flightSpending + cardSpending + partnerSpending + 
    (creditCard !== "none" ? cardConfig.annualFee : 0);
  const returnOnSpend = totalCost > 0 ? (pointsValue / totalCost) * 100 : 0;
  
  // Check if companion fare is available
  const companionFareAvailable = creditCard !== "none" && cardConfig.companionFare !== null;
  
  return {
    // Points breakdown
    totalRedeemablePoints: Math.round(totalRedeemablePoints),
    flightRedeemablePoints: Math.round(flightRedeemablePoints),
    creditCardRedeemablePoints: Math.round(creditCardRedeemablePoints),
    partnerRedeemablePoints: Math.round(partnerRedeemablePoints),
    
    // Status points
    totalStatusPoints: Math.round(totalStatusPoints),
    flightStatusPoints: Math.round(flightStatusPoints),
    creditCardStatusPoints: Math.round(creditCardStatusPoints),
    awardRedemptionStatusPoints: Math.round(awardRedemptionStatusPoints),
    
    // Status progress
    currentTier,
    nextTier,
    statusPointsToNextTier: Math.round(statusPointsToNextTier),
    percentToNextTier,
    
    // 2026 specific
    headStartBonus,
    
    // Financial analysis
    pointsValue,
    returnOnSpend,
    
    // Special benefits
    companionFareAvailable,
    freeCheckedBagValue,
    loungeAccessValue,
    
    // Earning method info
    earningMethodUsed: earningMethod,
    baseEarningRate
  };
}