import { z } from "zod";

// Southwest Rapid Rewards Tier Types
export type TierStatus = "member" | "a-list" | "a-list-preferred";

// Fare Types with different earn rates
export type FareType = "basic" | "choice" | "choice-preferred" | "choice-extra";

export interface FareTypeConfig {
  id: FareType;
  name: string;
  pointsPerDollar: number; // Base earn rate for all three point types (RR, CQP, TQP)
}

export const FARE_TYPES: Record<FareType, FareTypeConfig> = {
  "basic": {
    id: "basic",
    name: "Basic",
    pointsPerDollar: 2
  },
  "choice": {
    id: "choice",
    name: "Choice",
    pointsPerDollar: 6
  },
  "choice-preferred": {
    id: "choice-preferred",
    name: "Choice Preferred",
    pointsPerDollar: 10
  },
  "choice-extra": {
    id: "choice-extra",
    name: "Choice Extra",
    pointsPerDollar: 14
  }
};

// Credit Card Types
export type CreditCardType = "none" | "plus" | "premier" | "priority" | "business-premier" | "business-performance";

export interface CreditCardConfig {
  id: CreditCardType;
  name: string;
  pointsPerDollarSpend: number; // RR points per dollar of non-flight spend
  annualFee: number;
  annualRRBonus: number; // Annual anniversary bonus (RR points)
  annualCQPBonus: number; // Annual anniversary bonus (CQP)
  tqpBoostPer5k: number; // TQP bonus awarded per $5,000 in card spend
  signUpBonus: number; // One-time sign-up bonus (both RR and CQP)
  signUpSpendRequirement: number;
}

export const CREDIT_CARDS: Record<CreditCardType, CreditCardConfig> = {
  "none": {
    id: "none",
    name: "No Credit Card",
    pointsPerDollarSpend: 0,
    annualFee: 0,
    annualRRBonus: 0,
    annualCQPBonus: 0,
    tqpBoostPer5k: 0,
    signUpBonus: 0,
    signUpSpendRequirement: 0
  },
  "plus": {
    id: "plus",
    name: "Southwest Rapid Rewards Plus",
    pointsPerDollarSpend: 1,  // 1x on non-Southwest purchases (2x on Southwest)
    annualFee: 99,
    annualRRBonus: 3000,
    annualCQPBonus: 13000,  // Annual CQP bonus
    tqpBoostPer5k: 0,
    signUpBonus: 85000,
    signUpSpendRequirement: 3000
  },
  "premier": {
    id: "premier",
    name: "Southwest Rapid Rewards Premier",
    pointsPerDollarSpend: 1,  // 1x on non-Southwest purchases (3x on Southwest)
    annualFee: 149,
    annualRRBonus: 6000,
    annualCQPBonus: 16000,  // Annual CQP bonus
    tqpBoostPer5k: 1500,
    signUpBonus: 85000,
    signUpSpendRequirement: 3000
  },
  "priority": {
    id: "priority",
    name: "Southwest Rapid Rewards Priority",
    pointsPerDollarSpend: 1,  // 1x on non-Southwest purchases (4x on Southwest)
    annualFee: 229,
    annualRRBonus: 7500,
    annualCQPBonus: 17500,  // Annual CQP bonus
    tqpBoostPer5k: 2500,
    signUpBonus: 85000,
    signUpSpendRequirement: 3000
  },
  "business-premier": {
    id: "business-premier",
    name: "Southwest Rapid Rewards Business Premier",
    pointsPerDollarSpend: 1,  // 1x on non-Southwest purchases (3x on Southwest)
    annualFee: 149,
    annualRRBonus: 6000,
    annualCQPBonus: 16000,  // Annual CQP bonus
    tqpBoostPer5k: 2000,
    signUpBonus: 60000,
    signUpSpendRequirement: 3000
  },
  "business-performance": {
    id: "business-performance",
    name: "Southwest Rapid Rewards Business Performance",
    pointsPerDollarSpend: 1,  // 1x on non-Southwest purchases (4x on Southwest)
    annualFee: 299,
    annualRRBonus: 9000,
    annualCQPBonus: 19000,  // Annual CQP bonus
    tqpBoostPer5k: 2500,
    signUpBonus: 80000,
    signUpSpendRequirement: 5000
  }
};

// Tier Configuration with correct thresholds
export interface TierConfig {
  id: TierStatus;
  name: string;
  color: string;
  rrBonusMultiplier: number; // Tier bonus on RR points only (0%, 25%, 100%)
  qualifyingFlights: number; // Flights needed to qualify
  qualifyingTQP: number; // TQP needed to qualify
  benefits: string[];
}

export const TIER_CONFIGS: Record<TierStatus, TierConfig> = {
  "member": {
    id: "member",
    name: "Rapid Rewards Member",
    color: "gray",
    rrBonusMultiplier: 0,
    qualifyingFlights: 0,
    qualifyingTQP: 0,
    benefits: [
      "Earn points based on fare type",
      "Points never expire",
      "No blackout dates on reward travel",
      "Book award flights for others"
    ]
  },
  "a-list": {
    id: "a-list",
    name: "A-List",
    color: "gold",
    rrBonusMultiplier: 0.25, // +25% RR bonus
    qualifyingFlights: 20, // Corrected from 25
    qualifyingTQP: 35000,
    benefits: [
      "25% bonus Rapid Rewards points on flights",
      "Priority boarding (Group 5+ from Jan 27 2026)",
      "Free same-day standby and confirmed change",
      "One free checked bag",
      "Priority lane and express security access"
    ]
  },
  "a-list-preferred": {
    id: "a-list-preferred",
    name: "A-List Preferred",
    color: "red",
    rrBonusMultiplier: 1.0, // +100% RR bonus
    qualifyingFlights: 40, // Corrected from 50
    qualifyingTQP: 70000,
    benefits: [
      "100% bonus Rapid Rewards points on flights",
      "Preferred boarding (Group 2+ from Jan 27 2026)",
      "Two free checked bags",
      "Free same-day standby and confirmed change",
      "Four upgraded boardings per year",
      "Complimentary premium drink on flights over 175 miles",
      "Dedicated A-List Preferred customer service line",
      "Priority lane and express security access"
    ]
  }
};

// Companion Pass Constants
export const COMPANION_PASS_THRESHOLD_FLIGHTS = 100;
export const COMPANION_PASS_THRESHOLD_CQP = 135000;

// Calculator Input Schema
export const calculatorInputSchema = z.object({
  // Flight information
  flightSpending: z.number().min(0).default(0),
  fareType: z.enum(["basic", "choice", "choice-preferred", "choice-extra"]).default("choice"),
  currentTier: z.enum(["member", "a-list", "a-list-preferred"]).default("member"),
  flightsTaken: z.number().int().min(0).default(0),
  
  // Credit card information
  creditCard: z.enum(["none", "plus", "premier", "priority", "business-premier", "business-performance"]).default("none"),
  cardSpending: z.number().min(0).default(0), // Annual non-flight spending on the card
  includeSignUpBonus: z.boolean().default(false),
  includeAnnualBonus: z.boolean().default(false),
  
  // Partner points
  partnerPoints: z.number().min(0).default(0), // Points from hotels, dining, shopping, etc.
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;

// Calculation Results with three point types
export interface CalculationResults {
  // Point totals by type
  totalRRPoints: number; // Redeemable Rewards (for booking flights)
  totalCQP: number; // Companion Qualifying Points
  totalTQP: number; // Tier Qualifying Points
  
  // Breakdown by source
  flightRRPoints: number;
  flightCQP: number;
  flightTQP: number;
  
  cardRRPoints: number;
  cardCQP: number;
  cardTQP: number;
  
  partnerRRPoints: number;
  partnerCQP: number;
  
  // Tier status
  currentTier: TierStatus;
  nextTier: TierStatus | null;
  qualifiedForNextTier: boolean;
  
  progressToNextTier: {
    byFlights: number; // 0-100 percentage
    byTQP: number; // 0-100 percentage
    flightsCurrent: number;
    flightsNeeded: number;
    tqpCurrent: number;
    tqpNeeded: number;
  };
  
  // Companion Pass
  companionPassProgress: {
    byFlights: number; // 0-100 percentage
    byCQP: number; // 0-100 percentage
    flightsCurrent: number;
    flightsNeeded: number;
    cqpCurrent: number;
    cqpNeeded: number;
  };
  companionPassQualified: boolean;
  
  // Financial analysis
  redemptionValue: number; // Estimated value of RR points at 1.4¢ each
  totalCost: number; // Flight spending + card spending + annual fee
  returnOnSpend: number; // Percentage return
}
