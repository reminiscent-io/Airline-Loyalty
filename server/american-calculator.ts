import { 
  type AmericanCalculatorInput, 
  type AmericanCalculationResults, 
  type AmericanTierStatus,
  AMERICAN_TIER_CONFIGS,
  AMERICAN_FARE_TYPES,
  AMERICAN_CREDIT_CARDS
} from "@shared/american-schema";

const MILE_VALUE = 0.0145; // 1.45¢ per mile

export function calculateAmericanRewards(input: AmericanCalculatorInput): AmericanCalculationResults {
  const { 
    flightSpending, 
    fareType,
    currentTier, 
    creditCard,
    cardSpending,
    includeSignUpBonus,
    partnerSpending
  } = input;

  const tierConfig = AMERICAN_TIER_CONFIGS[currentTier];
  const fareTypeConfig = AMERICAN_FARE_TYPES[fareType];
  const cardConfig = AMERICAN_CREDIT_CARDS[creditCard];
  
  // ======================
  // MILES CALCULATION
  // ======================
  
  // Flight miles calculation
  // Base miles from flights (fare type multiplier)
  const baseFlightMiles = flightSpending * fareTypeConfig.baseMultiplier;
  
  // Apply status bonus percentage to base miles
  // Formula: Total = Base × (1 + Status Bonus %)
  const statusBonus = (tierConfig as any).statusBonusPercentage || 0;
  const flightMiles = baseFlightMiles * (1 + statusBonus);
  
  // Add credit card bonus on AA purchases
  let totalFlightMiles = flightMiles;
  if (creditCard !== "none") {
    totalFlightMiles += flightSpending * cardConfig.flightMilesBonus;
  }
  
  // Credit card miles from non-flight purchases
  let creditCardMiles = 0;
  
  if (creditCard !== "none") {
    creditCardMiles = cardSpending * cardConfig.purchaseMultiplier;
    
    // Sign-up bonus (if qualified)
    const totalCardSpend = flightSpending + cardSpending;
    if (includeSignUpBonus && totalCardSpend >= cardConfig.signUpSpendRequirement) {
      creditCardMiles += cardConfig.signUpBonus;
    }
  }
  
  // Partner miles (assuming base rate with no status bonus for simplicity)
  const partnerMiles = partnerSpending * 5; // 5x miles per dollar on partner flights
  
  // Total miles
  const totalMiles = totalFlightMiles + creditCardMiles + partnerMiles;
  
  // ======================
  // LOYALTY POINTS CALCULATION
  // ======================
  
  // Flight Loyalty Points (includes status bonus)
  // For American Airlines, Loyalty Points = Miles earned on flights
  const flightLoyaltyPoints = flightMiles; // Miles earned = Loyalty Points for AA flights
  
  // Card Loyalty Points (base miles only, no category bonuses)
  const cardLoyaltyPoints = (creditCard !== "none") 
    ? (flightSpending + cardSpending) * cardConfig.loyaltyPointsPerDollar
    : 0;
  
  // Add annual LP bonus if applicable (only if card selected)
  const annualLPBonus = (creditCard !== "none") ? (cardConfig.annualLoyaltyPointsBonus || 0) : 0;
  const totalCardLoyaltyPoints = cardLoyaltyPoints + annualLPBonus;
  
  // Total Loyalty Points
  const totalLoyaltyPoints = flightLoyaltyPoints + totalCardLoyaltyPoints;
  
  // ======================
  // STATUS PROGRESSION
  // ======================
  
  // Determine next tier
  const tiers: AmericanTierStatus[] = ["member", "gold", "platinum", "platinum-pro", "executive-platinum"];
  const currentTierIndex = tiers.indexOf(currentTier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  
  let loyaltyPointsToNextTier = 0;
  let percentToNextTier = 0;
  
  if (nextTier) {
    const nextTierConfig = AMERICAN_TIER_CONFIGS[nextTier];
    const currentRequirement = AMERICAN_TIER_CONFIGS[currentTier].loyaltyPointsRequired;
    const nextRequirement = nextTierConfig.loyaltyPointsRequired;
    
    loyaltyPointsToNextTier = Math.max(0, nextRequirement - totalLoyaltyPoints);
    
    // Calculate percentage progress
    const tierRange = nextRequirement - currentRequirement;
    const progress = totalLoyaltyPoints - currentRequirement;
    percentToNextTier = Math.min(100, Math.max(0, (progress / tierRange) * 100));
  }
  
  // ======================
  // FINANCIAL ANALYSIS
  // ======================
  
  const milesValue = totalMiles * MILE_VALUE;
  const totalCost = flightSpending + (creditCard !== "none" ? cardSpending + cardConfig.annualFee : 0) + partnerSpending;
  const returnOnSpend = totalCost > 0 ? (milesValue / totalCost) * 100 : 0;
  
  return {
    // Miles breakdown
    totalMiles: Math.round(totalMiles),
    flightMiles: Math.round(totalFlightMiles),
    creditCardMiles: Math.round(creditCardMiles),
    partnerMiles: Math.round(partnerMiles),
    
    // Loyalty Points breakdown
    totalLoyaltyPoints: Math.round(totalLoyaltyPoints),
    flightLoyaltyPoints: Math.round(flightLoyaltyPoints),
    cardLoyaltyPoints: Math.round(totalCardLoyaltyPoints),
    
    // Status progress
    currentTier,
    nextTier,
    loyaltyPointsToNextTier: Math.round(loyaltyPointsToNextTier),
    percentToNextTier: Math.round(percentToNextTier),
    
    // Financial analysis
    milesValue: Math.round(milesValue * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    returnOnSpend: Math.round(returnOnSpend * 10) / 10,
  };
}