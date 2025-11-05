import { 
  type UnitedCalculatorInput, 
  type UnitedCalculationResults, 
  type UnitedTierStatus,
  UNITED_TIER_CONFIGS,
  UNITED_FARE_TYPES,
  UNITED_CREDIT_CARDS
} from "@shared/united-schema";

const MILE_VALUE = 0.012; // 1.2¢ per mile (conservative estimate)

export function calculateUnitedRewards(input: UnitedCalculatorInput): UnitedCalculationResults {
  const { 
    flightSpending, 
    fareType,
    currentTier, 
    flightsTaken,
    creditCard,
    cardSpending,
    includeSignUpBonus,
    partnerSpending
  } = input;

  const tierConfig = UNITED_TIER_CONFIGS[currentTier];
  const fareTypeConfig = UNITED_FARE_TYPES[fareType];
  const cardConfig = UNITED_CREDIT_CARDS[creditCard];
  
  // ======================
  // MILES CALCULATION
  // ======================
  
  // Flight miles calculation (status multiplier)
  const flightMiles = flightSpending * tierConfig.milesMultiplier;
  
  // Add credit card bonus on United purchases
  let totalFlightMiles = flightMiles;
  if (creditCard !== "none") {
    totalFlightMiles += flightSpending * cardConfig.flightMilesBonus;
  }
  
  // Credit card miles from spending
  let creditCardMiles = cardSpending * cardConfig.purchaseMultiplier;
  
  // Sign-up bonus (if qualified)
  const totalCardSpend = creditCard !== "none" ? cardSpending : 0;
  if (includeSignUpBonus && totalCardSpend >= cardConfig.signUpSpendRequirement) {
    creditCardMiles += cardConfig.signUpBonus;
  }
  
  // Partner miles (base award miles divided by 5 for PQP calculation)
  const partnerMiles = partnerSpending * 5; // Assuming 5x miles per dollar on partner flights
  
  // Total miles
  const totalMiles = totalFlightMiles + creditCardMiles + partnerMiles;
  
  // ======================
  // PQP CALCULATION
  // ======================
  
  // Flight PQP (1:1 with qualifying spend)
  const flightPQP = flightSpending * fareTypeConfig.pqpMultiplier;
  
  // Card PQP (based on total card spending with cap)
  let cardPQP = 0;
  if (creditCard !== "none" && cardConfig.pqpPerDollar > 0) {
    const earnedPQP = totalCardSpend * cardConfig.pqpPerDollar;
    cardPQP = Math.min(earnedPQP, cardConfig.pqpCap);
  }
  
  // Partner PQP (base miles divided by 5 for preferred partners)
  const partnerPQP = Math.floor((partnerSpending * 5) / 5); // Simplified: equals partnerSpending
  
  // Total PQP
  const totalPQP = flightPQP + cardPQP + partnerPQP;
  
  // ======================
  // PQF CALCULATION
  // ======================
  
  // PQF only from eligible flights (not Basic Economy)
  const totalPQF = fareTypeConfig.pqfEligible ? flightsTaken : 0;
  
  // ======================
  // STATUS PROGRESSION
  // ======================
  
  // Determine next tier
  const tiers: UnitedTierStatus[] = ["member", "silver", "gold", "platinum", "1k"];
  const currentTierIndex = tiers.indexOf(currentTier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  
  let pqpToNextTier = 0;
  let pqfToNextTier = 0;
  let percentToNextTier = 0;
  
  if (nextTier) {
    const nextTierConfig = UNITED_TIER_CONFIGS[nextTier];
    const currentRequirement = UNITED_TIER_CONFIGS[currentTier].pqpRequired;
    const nextRequirement = nextTierConfig.pqpRequired;
    
    pqpToNextTier = Math.max(0, nextRequirement - totalPQP);
    pqfToNextTier = Math.max(0, nextTierConfig.pqfRequired - totalPQF);
    
    // Calculate percentage progress (based on PQP)
    const tierRange = nextRequirement - currentRequirement;
    const progress = totalPQP - currentRequirement;
    percentToNextTier = Math.min(100, Math.max(0, (progress / tierRange) * 100));
  }
  
  // ======================
  // FINANCIAL ANALYSIS
  // ======================
  
  const milesValue = totalMiles * MILE_VALUE;
  const totalSpend = flightSpending + cardSpending + partnerSpending;
  const returnOnSpend = totalSpend > 0 ? (milesValue / totalSpend) * 100 : 0;
  
  return {
    // Miles breakdown
    totalMiles: Math.round(totalMiles),
    flightMiles: Math.round(totalFlightMiles),
    creditCardMiles: Math.round(creditCardMiles),
    partnerMiles: Math.round(partnerMiles),
    
    // PQP breakdown
    totalPQP: Math.round(totalPQP),
    flightPQP: Math.round(flightPQP),
    cardPQP: Math.round(cardPQP),
    partnerPQP: Math.round(partnerPQP),
    
    // PQF
    totalPQF,
    
    // Status progress
    currentTier,
    nextTier,
    pqpToNextTier: Math.round(pqpToNextTier),
    pqfToNextTier,
    percentToNextTier: Math.round(percentToNextTier),
    
    // Financial analysis
    milesValue: Math.round(milesValue * 100) / 100,
    returnOnSpend: Math.round(returnOnSpend * 10) / 10,
  };
}