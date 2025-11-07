import { 
  DeltaCalculatorInput, 
  DeltaCalculationResults, 
  deltaTiers,
  DeltaTier,
  deltaFareRates 
} from "../shared/delta-schema";

const MILE_VALUE = 0.011; // 1.1¢ per mile

export function calculateDelta(input: DeltaCalculatorInput): DeltaCalculationResults {
  // Get current tier
  const tierMap: Record<string, DeltaTier> = {
    none: deltaTiers[0],
    silver: deltaTiers[1],
    gold: deltaTiers[2],
    platinum: deltaTiers[3],
    diamond: deltaTiers[4]
  };

  const currentTier = tierMap[input.currentTier];

  // Calculate MQDs from flights
  let mqdFromFlights = 0;
  if (input.fareClass !== "main-basic") {
    // Main Basic (Basic Economy) earns 0 MQDs
    mqdFromFlights = Math.round(input.annualFlightSpend);
  }

  // Calculate MQDs from credit card (includes flight spending in total card spend)
  let mqdHeadstart = 0;
  let mqdFromCard = 0;
  
  if (input.cardType === "platinum") {
    mqdHeadstart = 2500;
    const totalCardSpend = input.annualCardSpend + input.annualFlightSpend;
    mqdFromCard = Math.round(totalCardSpend * 0.05); // 1 MQD per $20
  } else if (input.cardType === "reserve") {
    mqdHeadstart = 2500;
    const totalCardSpend = input.annualCardSpend + input.annualFlightSpend;
    mqdFromCard = Math.round(totalCardSpend * 0.1); // 1 MQD per $10
  }

  const totalMQDs = mqdFromFlights + mqdFromCard + mqdHeadstart;

  // Calculate SkyMiles from flights using additive structure
  // Base miles from fare class + Bonus miles from loyalty tier
  const baseFareRate = deltaFareRates[input.fareClass] || 0;
  const loyaltyBonus = currentTier.earningRate; // This is the bonus rate (0 for General, +2 for Silver, etc.)
  const totalFlightEarningRate = baseFareRate + loyaltyBonus;
  
  let flightSkyMiles = 0;
  if (input.fareClass !== "main-basic") {
    // Main Basic earns 0 miles regardless of status
    flightSkyMiles = Math.round(input.annualFlightSpend * totalFlightEarningRate);
  }

  // Calculate SkyMiles from credit card (simplified - assuming average 1.5x, includes flight spending)
  const totalCardSpend = input.annualCardSpend + input.annualFlightSpend;
  let cardSkyMiles = input.cardType !== "none" ? Math.round(totalCardSpend * 1.5) : 0;
  
  // Add sign-up bonus if qualified
  if (input.includeSignUpBonus && input.cardType !== "none") {
    const signUpBonuses = {
      gold: { bonus: 75000, requirement: 3000 },
      platinum: { bonus: 90000, requirement: 4000 },
      reserve: { bonus: 100000, requirement: 6000 }
    };
    
    const cardConfig = signUpBonuses[input.cardType as keyof typeof signUpBonuses];
    if (cardConfig && totalCardSpend >= cardConfig.requirement) {
      cardSkyMiles += cardConfig.bonus;
    }
  }
  
  const totalSkyMiles = flightSkyMiles + cardSkyMiles;

  // Determine achievable tier based on total MQDs
  let achievableTier = deltaTiers[0];
  for (let i = deltaTiers.length - 1; i >= 0; i--) {
    const tier = deltaTiers[i];
    if (tier.isGhost) continue; // Skip Delta 360° (invitation only)
    if (totalMQDs >= tier.mqd) {
      achievableTier = tier;
      break;
    }
  }

  // Find next tier
  let nextTier = null;
  let mqdToNextTier = 0;
  const currentTierIndex = deltaTiers.findIndex(t => t.name === achievableTier.name);
  if (currentTierIndex < deltaTiers.length - 2) { // -2 to exclude Delta 360°
    nextTier = deltaTiers[currentTierIndex + 1];
    if (!nextTier.isGhost) {
      mqdToNextTier = Math.max(0, nextTier.mqd - totalMQDs);
    }
  }

  // Financial Analysis
  // Delta cardholders get 15% discount on redemptions, making miles worth more
  const hasCard = input.cardType !== "none";
  const effectiveMileValue = hasCard ? MILE_VALUE / 0.85 : MILE_VALUE;
  const milesValue = totalSkyMiles * effectiveMileValue;
  const totalSpend = hasCard ? input.annualFlightSpend + input.annualCardSpend : input.annualFlightSpend;
  const returnOnSpend = totalSpend > 0 ? (milesValue / totalSpend) * 100 : 0;

  return {
    totalSkyMiles,
    totalMQDs,
    currentTier,
    nextTier,
    mqdToNextTier,
    flightSkyMiles,
    cardSkyMiles,
    mqdFromFlights,
    mqdFromCard,
    mqdHeadstart,
    achievableTier,
    milesValue: Math.round(milesValue * 100) / 100,
    returnOnSpend: Math.round(returnOnSpend * 10) / 10,
    redemptionDiscountApplied: hasCard
  };
}