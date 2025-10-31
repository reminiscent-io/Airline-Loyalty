import { 
  type CalculatorInput, 
  type CalculationResults, 
  type TierStatus,
  TIER_CONFIGS,
  COMPANION_PASS_THRESHOLD 
} from "@shared/schema";

export function calculateRewards(input: CalculatorInput): CalculationResults {
  const { flightSpending, currentTier, flightsTaken, creditCardPoints } = input;

  const tierConfig = TIER_CONFIGS[currentTier];
  
  // Flight points are the only points that count as Tier Qualifying Points (TQP)
  const flightPointsEarned = flightSpending * tierConfig.pointsPerDollar;
  
  // Total points include both flight points and credit card points
  const totalPointsEarned = flightPointsEarned + creditCardPoints;
  
  // Only flight-earned points count as Tier Qualifying Points
  const tierQualifyingPoints = flightPointsEarned;

  // Determine next tier and progress
  let nextTier: TierStatus | null = null;
  let progressByFlights = 0;
  let progressByPoints = 0;

  if (currentTier === "member") {
    nextTier = "a-list";
    const requiredFlights = TIER_CONFIGS["a-list"].qualifyingFlights;
    const requiredPoints = TIER_CONFIGS["a-list"].qualifyingPoints;
    
    progressByFlights = (flightsTaken / requiredFlights) * 100;
    // Use only tier qualifying points (flight points, not credit card points)
    progressByPoints = (tierQualifyingPoints / requiredPoints) * 100;
  } else if (currentTier === "a-list") {
    nextTier = "a-list-preferred";
    const requiredFlights = TIER_CONFIGS["a-list-preferred"].qualifyingFlights;
    const requiredPoints = TIER_CONFIGS["a-list-preferred"].qualifyingPoints;
    
    progressByFlights = (flightsTaken / requiredFlights) * 100;
    // Use only tier qualifying points (flight points, not credit card points)
    progressByPoints = (tierQualifyingPoints / requiredPoints) * 100;
  }

  // Companion Pass uses total points (both flight and credit card points)
  const companionPassProgress = (totalPointsEarned / COMPANION_PASS_THRESHOLD) * 100;
  const companionPassQualified = totalPointsEarned >= COMPANION_PASS_THRESHOLD;

  return {
    totalPointsEarned,
    flightPointsEarned,
    creditCardPoints,
    tierQualifyingPoints,
    currentTier,
    nextTier,
    progressToNextTier: {
      byFlights: Math.min(progressByFlights, 100),
      byPoints: Math.min(progressByPoints, 100),
    },
    companionPassProgress: Math.min(companionPassProgress, 100),
    companionPassQualified,
  };
}
