import { 
  DeltaCalculatorInput, 
  DeltaCalculationResults, 
  deltaTiers,
  DeltaTier 
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
  if (input.fareClass !== "basic") {
    // Basic Economy earns 0 MQDs
    mqdFromFlights = Math.round(input.annualFlightSpend);
  }

  // Calculate MQDs from credit card
  let mqdHeadstart = 0;
  let mqdFromCard = 0;
  
  if (input.cardType === "platinum") {
    mqdHeadstart = 2500;
    mqdFromCard = Math.round(input.annualCardSpend * 0.05); // 1 MQD per $20
  } else if (input.cardType === "reserve") {
    mqdHeadstart = 2500;
    mqdFromCard = Math.round(input.annualCardSpend * 0.1); // 1 MQD per $10
  }

  const totalMQDs = mqdFromFlights + mqdFromCard + mqdHeadstart;

  // Calculate SkyMiles from flights
  let flightSkyMiles = 0;
  if (input.fareClass !== "basic") {
    // Basic Economy earns 0 SkyMiles
    const earningRate = currentTier.earningRate;
    flightSkyMiles = Math.round(input.annualFlightSpend * earningRate);
  }

  // Calculate SkyMiles from credit card (simplified - assuming average 1.5x)
  const cardSkyMiles = input.cardType !== "none" ? Math.round(input.annualCardSpend * 1.5) : 0;
  
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
  const milesValue = totalSkyMiles * MILE_VALUE;
  const totalSpend = input.cardType !== "none" ? input.annualFlightSpend + input.annualCardSpend : input.annualFlightSpend;
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
    returnOnSpend: Math.round(returnOnSpend * 10) / 10
  };
}