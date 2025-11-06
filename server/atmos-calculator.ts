import { 
  type AtmosCalculatorInput, 
  type AtmosCalculationResults, 
  type AtmosTierStatus,
  ATMOS_TIER_CONFIGS,
  ATMOS_FARE_TYPES,
  ATMOS_CREDIT_CARDS
} from "@shared/atmos-schema";

const MILE_VALUE = 0.016; // 1.6¢ per mile (Alaska/Hawaiian average)
const BAG_VALUE = 35; // $35 per checked bag

export function calculateAtmosRewards(input: AtmosCalculatorInput): AtmosCalculationResults {
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

  const tierConfig = ATMOS_TIER_CONFIGS[currentTier];
  const fareTypeConfig = ATMOS_FARE_TYPES[fareType];
  const cardConfig = ATMOS_CREDIT_CARDS[creditCard];
  
  // ======================
  // MILES CALCULATION
  // ======================
  
  // Base flight miles (before fare type modifier)
  const baseMiles = flightSpending * tierConfig.milesMultiplier;
  
  // Apply fare type modifier
  const flightMiles = baseMiles * fareTypeConfig.baseMultiplier;
  
  // Add credit card bonus on airline purchases
  let totalFlightMiles = flightMiles;
  if (creditCard !== "none") {
    // Add bonus miles from using card on airline purchases
    totalFlightMiles += flightSpending * cardConfig.flightMilesBonus;
  }
  
  // Credit card miles from non-airline spending
  let creditCardMiles = cardSpending * cardConfig.purchaseMultiplier;
  
  // Sign-up bonus (if qualified)
  const totalCardSpend = creditCard !== "none" ? cardSpending : 0;
  if (includeSignUpBonus && totalCardSpend >= cardConfig.signUpSpendRequirement) {
    creditCardMiles += cardConfig.signUpBonus;
  }
  
  // Partner miles (base miles on partner airlines)
  const partnerMiles = partnerSpending * 5; // Assume 5x miles per dollar on partners
  
  // Total miles
  const totalMiles = totalFlightMiles + creditCardMiles + partnerMiles;
  
  // ======================
  // ELITE QUALIFICATION
  // ======================
  
  // Elite qualifying miles (only from actual flights)
  const eliteQualifyingMiles = Math.floor(flightSpending * 5 * fareTypeConfig.baseMultiplier);
  
  // Elite qualifying segments (if eligible fare)
  const eliteQualifyingSegments = fareTypeConfig.upgradeEligible ? segments : Math.floor(segments * 0.5);
  
  // ======================
  // STATUS PROGRESSION
  // ======================
  
  // Determine next tier
  const tiers: AtmosTierStatus[] = ["member", "mvp", "mvp-gold", "mvp-gold-75k", "mvp-gold-100k"];
  const currentTierIndex = tiers.indexOf(currentTier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  
  let milesToNextTier = 0;
  let segmentsToNextTier = 0;
  let percentToNextTier = 0;
  
  if (nextTier) {
    const nextTierConfig = ATMOS_TIER_CONFIGS[nextTier];
    const currentRequirement = ATMOS_TIER_CONFIGS[currentTier].milesRequired;
    const nextRequirement = nextTierConfig.milesRequired;
    
    milesToNextTier = Math.max(0, nextRequirement - eliteQualifyingMiles);
    segmentsToNextTier = Math.max(0, nextTierConfig.segmentsRequired - eliteQualifyingSegments);
    
    // Calculate percentage progress (based on miles)
    const tierRange = nextRequirement - currentRequirement;
    const progress = eliteQualifyingMiles - currentRequirement;
    percentToNextTier = Math.min(100, Math.max(0, (progress / tierRange) * 100));
  }
  
  // ======================
  // FINANCIAL ANALYSIS
  // ======================
  
  const milesValue = totalMiles * MILE_VALUE;
  
  // Calculate value of free checked bags (if card held) - informational only, not included in value analysis
  const freeCheckedBagValue = creditCard !== "none" && cardConfig.freeCheckedBag ? 
    segments * BAG_VALUE : 0;
  
  const totalSpend = flightSpending + (creditCard !== "none" ? cardSpending : 0) + partnerSpending;
  const returnOnSpend = totalSpend > 0 ? (milesValue / totalSpend) * 100 : 0;
  
  return {
    // Miles breakdown
    totalMiles: Math.round(totalMiles),
    flightMiles: Math.round(totalFlightMiles),
    creditCardMiles: Math.round(creditCardMiles),
    partnerMiles: Math.round(partnerMiles),
    
    // Elite qualifying
    eliteQualifyingMiles: Math.round(eliteQualifyingMiles),
    eliteQualifyingSegments,
    
    // Status progress
    currentTier,
    nextTier,
    milesToNextTier: Math.round(milesToNextTier),
    segmentsToNextTier,
    percentToNextTier: Math.round(percentToNextTier),
    
    // Financial analysis
    milesValue: Math.round(milesValue * 100) / 100,
    returnOnSpend: Math.round(returnOnSpend * 10) / 10,
    
    // Special benefits
    companionFareAvailable: creditCard === "alaska-personal" || creditCard === "alaska-business",
    freeCheckedBagValue: Math.round(freeCheckedBagValue),
  };
}