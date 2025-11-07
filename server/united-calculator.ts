import { 
  type UnitedCalculatorInput, 
  type UnitedCalculationResults, 
  type UnitedTierStatus,
  UNITED_TIER_CONFIGS,
  UNITED_FARE_TYPES,
  UNITED_CREDIT_CARDS
} from "@shared/united-schema";

const MILE_VALUE = 0.0122; // 1.22¢ per mile

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
  
  // Flight miles calculation (status multiplier only)
  const flightMiles = flightSpending * tierConfig.milesMultiplier;
  
  // Credit card miles from total card spending (flight + non-flight)
  let creditCardMiles = 0;
  
  if (creditCard !== "none") {
    const totalCardSpend = cardSpending + flightSpending;
    
    // Miles from all card spending (both flight and non-flight)
    // Flight spending gets flightMilesBonus rate, non-flight gets purchaseMultiplier rate
    creditCardMiles = (flightSpending * cardConfig.flightMilesBonus) + 
                      (cardSpending * cardConfig.purchaseMultiplier);
    
    // Sign-up bonus (if qualified)
    if (includeSignUpBonus && totalCardSpend >= cardConfig.signUpSpendRequirement) {
      creditCardMiles += cardConfig.signUpBonus;
    }
  }
  
  // Partner miles (base award miles divided by 5 for PQP calculation)
  const partnerMiles = partnerSpending * 5; // Assuming 5x miles per dollar on partner flights
  
  // Total miles
  const totalMiles = flightMiles + creditCardMiles + partnerMiles;
  
  // ======================
  // PQP CALCULATION
  // ======================
  
  // Flight PQP (1:1 with qualifying spend)
  const flightPQP = flightSpending * fareTypeConfig.pqpMultiplier;
  
  // Card PQP (based on total card spending with cap) - includes flight spending
  let cardPQP = 0;
  if (creditCard !== "none" && cardConfig.pqpPerDollar > 0) {
    const totalCardSpend = cardSpending + flightSpending;
    const earnedPQP = totalCardSpend * cardConfig.pqpPerDollar;
    // Apply cap only if cap is greater than 0
    cardPQP = cardConfig.pqpCap > 0 ? Math.min(earnedPQP, cardConfig.pqpCap) : earnedPQP;
    
    // Add annual PQP bonus if available
    if ('annualPQPBonus' in cardConfig && cardConfig.annualPQPBonus) {
      cardPQP += cardConfig.annualPQPBonus;
    }
    
    // Add sign-up PQP bonus if qualified
    if (includeSignUpBonus && totalCardSpend >= cardConfig.signUpSpendRequirement) {
      if ('signUpBonusPQP' in cardConfig && cardConfig.signUpBonusPQP) {
        cardPQP += cardConfig.signUpBonusPQP;
      }
    }
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
  let qualifiesForNextTier = false;
  let qualificationPath = '';
  
  if (nextTier) {
    const nextTierConfig = UNITED_TIER_CONFIGS[nextTier];
    const currentRequirement = UNITED_TIER_CONFIGS[currentTier].pqpRequired;
    const nextRequirement = nextTierConfig.pqpRequired;
    
    // Check if minimum 4 United flights requirement is met
    const meetsFlightMinimum = flightsTaken >= 4;
    
    // Check PQP-only path
    const meetsPQPOnlyPath = totalPQP >= nextRequirement && meetsFlightMinimum;
    
    // Check alternative PQP+PQF path if it exists
    let meetsAlternativePath = false;
    if ('alternativePath' in nextTierConfig && nextTierConfig.alternativePath) {
      const altPath = nextTierConfig.alternativePath;
      meetsAlternativePath = totalPQP >= altPath.pqp && totalPQF >= altPath.pqf && meetsFlightMinimum;
    }
    
    qualifiesForNextTier = meetsPQPOnlyPath || meetsAlternativePath;
    
    if (meetsPQPOnlyPath) {
      qualificationPath = 'PQP-only';
      pqpToNextTier = 0;
      pqfToNextTier = 0;
    } else if (meetsAlternativePath && 'alternativePath' in nextTierConfig) {
      qualificationPath = 'Alternative (PQP+PQF)';
      pqpToNextTier = 0;
      pqfToNextTier = 0;
    } else {
      // Show progress to both paths
      pqpToNextTier = Math.max(0, nextRequirement - totalPQP);
      
      // For alternative path, show the closer option
      if ('alternativePath' in nextTierConfig && nextTierConfig.alternativePath) {
        const altPath = nextTierConfig.alternativePath;
        const altPQPGap = Math.max(0, altPath.pqp - totalPQP);
        const altPQFGap = Math.max(0, altPath.pqf - totalPQF);
        
        // If alternative path is closer, show those requirements
        if (altPQPGap < pqpToNextTier) {
          pqpToNextTier = altPQPGap;
          pqfToNextTier = altPQFGap;
          qualificationPath = 'Alternative path closer';
        }
      } else {
        pqfToNextTier = Math.max(0, nextTierConfig.pqfRequired - totalPQF);
      }
    }
    
    // Calculate percentage progress (based on PQP)
    const tierRange = nextRequirement - currentRequirement;
    const progress = totalPQP - currentRequirement;
    percentToNextTier = Math.min(100, Math.max(0, (progress / tierRange) * 100));
  }
  
  // ======================
  // FINANCIAL ANALYSIS
  // ======================
  
  const milesValue = totalMiles * MILE_VALUE;
  const totalSpend = flightSpending + (creditCard !== "none" ? cardSpending : 0) + partnerSpending;
  const returnOnSpend = totalSpend > 0 ? (milesValue / totalSpend) * 100 : 0;
  
  return {
    // Miles breakdown
    totalMiles: Math.round(totalMiles),
    flightMiles: Math.round(flightMiles),
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
    qualifiesForNextTier,
    qualificationPath,
    meetsFlightMinimum: flightsTaken >= 4,
    
    // Financial analysis
    milesValue: Math.round(milesValue * 100) / 100,
    returnOnSpend: Math.round(returnOnSpend * 10) / 10,
  };
}