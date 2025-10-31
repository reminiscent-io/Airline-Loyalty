import { z } from "zod";

// Southwest Rapid Rewards Tier Types
export type TierStatus = "member" | "a-list" | "a-list-preferred";

// Tier Configuration
export interface TierConfig {
  id: TierStatus;
  name: string;
  color: string;
  pointsPerDollar: number;
  qualifyingFlights: number;
  qualifyingPoints: number;
  benefits: string[];
}

export const TIER_CONFIGS: Record<TierStatus, TierConfig> = {
  "member": {
    id: "member",
    name: "Rapid Rewards Member",
    color: "gray",
    pointsPerDollar: 6,
    qualifyingFlights: 0,
    qualifyingPoints: 0,
    benefits: [
      "Earn 6 points per dollar",
      "Points don't expire",
      "No blackout dates",
      "Book award flights for others"
    ]
  },
  "a-list": {
    id: "a-list",
    name: "A-List",
    color: "gold",
    pointsPerDollar: 7,
    qualifyingFlights: 25,
    qualifyingPoints: 35000,
    benefits: [
      "Earn 7 points per dollar",
      "Priority boarding",
      "25% earning bonus",
      "Free same-day standby",
      "Free same-day confirmed change"
    ]
  },
  "a-list-preferred": {
    id: "a-list-preferred",
    name: "A-List Preferred",
    color: "red",
    pointsPerDollar: 10,
    qualifyingFlights: 50,
    qualifyingPoints: 70000,
    benefits: [
      "Earn 10 points per dollar",
      "Priority boarding (Position 1-15)",
      "100% earning bonus",
      "Free same-day standby",
      "Free same-day confirmed change",
      "Free premium drink"
    ]
  }
};

// Calculator Input Schema
export const calculatorInputSchema = z.object({
  flightSpending: z.number().min(0).default(0),
  currentTier: z.enum(["member", "a-list", "a-list-preferred"]).default("member"),
  flightsTaken: z.number().int().min(0).default(0),
  creditCardPoints: z.number().min(0).default(0),
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;

// Calculation Results
export interface CalculationResults {
  totalPointsEarned: number;
  flightPointsEarned: number;
  creditCardPoints: number;
  tierQualifyingPoints: number;
  currentTier: TierStatus;
  nextTier: TierStatus | null;
  progressToNextTier: {
    byFlights: number;
    byPoints: number;
  };
  companionPassProgress: number;
  companionPassQualified: boolean;
}

// Companion Pass Constants
export const COMPANION_PASS_THRESHOLD = 135000;
