export type AirlineKey = "southwest" | "american" | "united" | "delta" | "jetblue" | "atmos";

export interface AirlineConfig {
  key: AirlineKey;
  name: string;
  endpoint: string;
  color: string; // HSL string for Recharts
}

export const AIRLINES: AirlineConfig[] = [
  { key: "american", name: "American", endpoint: "/api/american/calculate", color: "hsl(207, 100%, 41%)" },
  { key: "atmos", name: "Atmos", endpoint: "/api/atmos/calculate", color: "hsl(196, 98%, 22%)" },
  { key: "delta", name: "Delta", endpoint: "/api/delta/calculate", color: "hsl(351, 85%, 42%)" },
  { key: "jetblue", name: "JetBlue", endpoint: "/api/jetblue/calculate", color: "hsl(205, 100%, 25%)" },
  { key: "southwest", name: "Southwest", endpoint: "/api/calculate", color: "hsl(230, 58%, 44%)" },
  { key: "united", name: "United", endpoint: "/api/united/calculate", color: "hsl(207, 100%, 13%)" },
];

export interface AirlineComparisonResult {
  airlineKey: AirlineKey;
  airlineName: string;
  returnOnSpend: number;
  redemptionValue: number;
  totalCost: number;
  creditCardName: string;
  annualFee: number;
}

export interface AirlineSettings {
  creditCard: string;
  fareType: string;
  tier: string;
}

export const DEFAULT_AIRLINE_SETTINGS: Record<AirlineKey, AirlineSettings> = {
  southwest: { creditCard: "none", fareType: "choice", tier: "member" },
  american: { creditCard: "none", fareType: "main-cabin", tier: "member" },
  united: { creditCard: "none", fareType: "economy", tier: "member" },
  delta: { creditCard: "none", fareType: "classic", tier: "none" },
  jetblue: { creditCard: "none", fareType: "blue", tier: "trueblue" },
  atmos: { creditCard: "none", fareType: "main-cabin", tier: "member" },
};

export interface ComparisonInputs {
  flightSpending: number;
  cardSpending: number;
  includeSignUpBonus: boolean;
  airlineSettings: Record<AirlineKey, AirlineSettings>;
}
