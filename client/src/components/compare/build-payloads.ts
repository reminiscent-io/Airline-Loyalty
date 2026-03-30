import type { AirlineKey, ComparisonInputs } from "./types";

type AirlinePayload = {
  endpoint: string;
  body: Record<string, unknown>;
};

export function buildPayloads(inputs: ComparisonInputs): Record<AirlineKey, AirlinePayload> {
  const { flightSpending, cardSpending, includeSignUpBonus, airlineSettings } = inputs;

  return {
    southwest: {
      endpoint: "/api/calculate",
      body: {
        flightSpending,
        cardSpending,
        creditCard: airlineSettings.southwest.creditCard,
        includeSignUpBonus,
        fareType: airlineSettings.southwest.fareType,
        currentTier: airlineSettings.southwest.tier,
        flightsTaken: 0,
        includeAnnualBonus: false,
        partnerPoints: 0,
      },
    },
    american: {
      endpoint: "/api/american/calculate",
      body: {
        flightSpending,
        cardSpending,
        creditCard: airlineSettings.american.creditCard,
        includeSignUpBonus,
        fareType: airlineSettings.american.fareType,
        currentTier: airlineSettings.american.tier,
        partnerSpending: 0,
      },
    },
    united: {
      endpoint: "/api/united/calculate",
      body: {
        flightSpending,
        cardSpending,
        creditCard: airlineSettings.united.creditCard,
        includeSignUpBonus,
        fareType: airlineSettings.united.fareType,
        currentTier: airlineSettings.united.tier,
        flightsTaken: 0,
        partnerSpending: 0,
      },
    },
    delta: {
      endpoint: "/api/delta/calculate",
      body: {
        annualFlightSpend: flightSpending,
        annualCardSpend: cardSpending,
        cardType: airlineSettings.delta.creditCard,
        includeSignUpBonus,
        fareClass: airlineSettings.delta.fareType,
        currentTier: airlineSettings.delta.tier,
      },
    },
    jetblue: {
      endpoint: "/api/jetblue/calculate",
      body: {
        flightSpending,
        cardSpending,
        creditCard: airlineSettings.jetblue.creditCard,
        includeSignUpBonus,
        fareType: airlineSettings.jetblue.fareType,
        currentTier: airlineSettings.jetblue.tier,
        segments: 0,
        partnerSpending: 0,
      },
    },
    atmos: {
      endpoint: "/api/atmos/calculate",
      body: {
        flightSpending,
        cardSpending,
        creditCard: airlineSettings.atmos.creditCard,
        includeSignUpBonus,
        earningMethod: "spend",
        flightDistance: 0,
        segments: 0,
        fareBucket: airlineSettings.atmos.fareType,
        isInternational: false,
        currentTier: airlineSettings.atmos.tier,
        partnerSpending: 0,
        awardPointsRedeemed: 0,
      },
    },
  };
}

// Each airline uses different field names for the dollar value of points
export function normalizeResult(
  airlineKey: AirlineKey,
  result: Record<string, unknown>
): { returnOnSpend: number; redemptionValue: number; totalCost: number } {
  const returnOnSpend = (result.returnOnSpend as number) ?? 0;
  const totalCost = (result.totalCost as number) ?? 0;

  let redemptionValue: number;
  switch (airlineKey) {
    case "southwest":
      redemptionValue = (result.redemptionValue as number) ?? 0;
      break;
    case "american":
    case "united":
    case "delta":
      redemptionValue = (result.milesValue as number) ?? 0;
      break;
    case "jetblue":
    case "atmos":
      redemptionValue = (result.pointsValue as number) ?? 0;
      break;
  }

  return { returnOnSpend, redemptionValue, totalCost };
}
