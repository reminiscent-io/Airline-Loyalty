import { 
  type CalculatorInput, 
  type CalculationResults, 
  type TierStatus,
  TIER_CONFIGS,
  FARE_TYPES,
  CREDIT_CARDS,
  COMPANION_PASS_THRESHOLD_FLIGHTS,
  COMPANION_PASS_THRESHOLD_CQP
} from "@shared/schema";

const RR_POINT_VALUE = 0.014; // 1.4¢ per point

export function calculateRewards(input: CalculatorInput): CalculationResults {
  const { 
    flightSpending, 
    fareType,
    currentTier, 
    flightsTaken,
    creditCard,
    cardSpending,
    includeSignUpBonus,
    includeAnnualBonus,
    partnerPoints
  } = input;

  const tierConfig = TIER_CONFIGS[currentTier];
  const fareTypeConfig = FARE_TYPES[fareType];
  const cardConfig = CREDIT_CARDS[creditCard];
  
  // ======================
  // FLIGHT POINTS CALCULATION
  // ======================
  
  // Base flight points (same for all three point types: RR, CQP, TQP)
  const baseFlightPoints = flightSpending * fareTypeConfig.pointsPerDollar;
  
  // RR points get tier bonus, but CQP and TQP do not
  const flightRRPoints = baseFlightPoints * (1 + tierConfig.rrBonusMultiplier);
  const flightCQP = baseFlightPoints; // No tier bonus on CQP
  const flightTQP = baseFlightPoints; // No tier bonus on TQP
  
  // ======================
  // CREDIT CARD POINTS CALCULATION
  // ======================
  
  // Base points from card spending (non-flight purchases)
  const cardBaseRRPoints = cardSpending * cardConfig.pointsPerDollarSpend;
  
  // Annual bonus (if included)
  const cardAnnualRR = includeAnnualBonus ? cardConfig.annualRRBonus : 0;
  const cardAnnualCQP = includeAnnualBonus ? cardConfig.annualCQPBonus : 0;
  
  // Sign-up bonus (if included and spend requirement met)
  const signUpBonus = (includeSignUpBonus && cardSpending >= cardConfig.signUpSpendRequirement) 
    ? cardConfig.signUpBonus 
    : 0;
  
  // TQP boost: awarded per $5,000 in card spending
  const tqpBoostCount = Math.floor(cardSpending / 5000);
  const cardTQP = tqpBoostCount * cardConfig.tqpBoostPer5k;
  
  // Total card points - card base spend counts toward both RR and CQP
  const cardRRPoints = cardBaseRRPoints + cardAnnualRR + signUpBonus;
  const cardCQP = cardBaseRRPoints + cardAnnualCQP + signUpBonus; // Card spend counts toward Companion Pass
  
  // ======================
  // PARTNER POINTS
  // ======================
  
  // Partner points count toward RR and CQP, but NOT TQP
  const partnerRRPoints = partnerPoints;
  const partnerCQP = partnerPoints;
  
  // ======================
  // TOTALS BY POINT TYPE
  // ======================
  
  const totalRRPoints = flightRRPoints + cardRRPoints + partnerRRPoints;
  const totalCQP = flightCQP + cardCQP + partnerCQP;
  const totalTQP = flightTQP + cardTQP; // No partner points for TQP
  
  // ======================
  // TIER PROGRESSION
  // ======================
  
  let nextTier: TierStatus | null = null;
  let qualifiedForNextTier = false;
  let progressByFlights = 0;
  let progressByTQP = 0;
  let flightsNeeded = 0;
  let tqpNeeded = 0;

  if (currentTier === "member") {
    nextTier = "a-list";
    flightsNeeded = TIER_CONFIGS["a-list"].qualifyingFlights;
    tqpNeeded = TIER_CONFIGS["a-list"].qualifyingTQP;
    
    // Qualification is OR logic: either flights OR TQP threshold
    qualifiedForNextTier = (flightsTaken >= flightsNeeded) || (totalTQP >= tqpNeeded);
    
    progressByFlights = (flightsTaken / flightsNeeded) * 100;
    progressByTQP = (totalTQP / tqpNeeded) * 100;
    
  } else if (currentTier === "a-list") {
    nextTier = "a-list-preferred";
    flightsNeeded = TIER_CONFIGS["a-list-preferred"].qualifyingFlights;
    tqpNeeded = TIER_CONFIGS["a-list-preferred"].qualifyingTQP;
    
    // Qualification is OR logic: either flights OR TQP threshold
    qualifiedForNextTier = (flightsTaken >= flightsNeeded) || (totalTQP >= tqpNeeded);
    
    progressByFlights = (flightsTaken / flightsNeeded) * 100;
    progressByTQP = (totalTQP / tqpNeeded) * 100;
  }
  
  // ======================
  // COMPANION PASS
  // ======================
  
  // Companion Pass uses OR logic: either 100 flights OR 135,000 CQP
  const companionPassQualified = (flightsTaken >= COMPANION_PASS_THRESHOLD_FLIGHTS) || 
                                  (totalCQP >= COMPANION_PASS_THRESHOLD_CQP);
  
  const progressByFlightsCP = (flightsTaken / COMPANION_PASS_THRESHOLD_FLIGHTS) * 100;
  const progressByCQP = (totalCQP / COMPANION_PASS_THRESHOLD_CQP) * 100;
  
  // ======================
  // FINANCIAL ANALYSIS
  // ======================
  
  const redemptionValue = totalRRPoints * RR_POINT_VALUE;
  const totalCost = flightSpending + cardSpending + (cardConfig.annualFee || 0);
  const returnOnSpend = totalCost > 0 ? (redemptionValue / totalCost) * 100 : 0;

  return {
    // Point totals by type
    totalRRPoints: Math.round(totalRRPoints),
    totalCQP: Math.round(totalCQP),
    totalTQP: Math.round(totalTQP),
    
    // Breakdown by source
    flightRRPoints: Math.round(flightRRPoints),
    flightCQP: Math.round(flightCQP),
    flightTQP: Math.round(flightTQP),
    
    cardRRPoints: Math.round(cardRRPoints),
    cardCQP: Math.round(cardCQP),
    cardTQP: Math.round(cardTQP),
    
    partnerRRPoints: Math.round(partnerRRPoints),
    partnerCQP: Math.round(partnerCQP),
    
    // Tier status
    currentTier,
    nextTier,
    qualifiedForNextTier,
    
    progressToNextTier: {
      byFlights: Math.min(progressByFlights, 100),
      byTQP: Math.min(progressByTQP, 100),
      flightsCurrent: flightsTaken,
      flightsNeeded,
      tqpCurrent: Math.round(totalTQP),
      tqpNeeded,
    },
    
    // Companion Pass
    companionPassProgress: {
      byFlights: Math.min(progressByFlightsCP, 100),
      byCQP: Math.min(progressByCQP, 100),
      flightsCurrent: flightsTaken,
      flightsNeeded: COMPANION_PASS_THRESHOLD_FLIGHTS,
      cqpCurrent: Math.round(totalCQP),
      cqpNeeded: COMPANION_PASS_THRESHOLD_CQP,
    },
    companionPassQualified,
    
    // Financial analysis
    redemptionValue: Math.round(redemptionValue),
    totalCost: Math.round(totalCost),
    returnOnSpend: Math.round(returnOnSpend * 10) / 10, // Round to 1 decimal
  };
}
