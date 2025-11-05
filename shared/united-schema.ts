import { z } from "zod";

// United Airlines Tier Status
export const unitedTierStatuses = ["member", "silver", "gold", "platinum", "1k"] as const;
export type UnitedTierStatus = typeof unitedTierStatuses[number];

// United Airlines Fare Types
export const unitedFareTypes = ["basic-economy", "economy", "premium-plus", "business", "first"] as const;
export type UnitedFareType = typeof unitedFareTypes[number];

// United Airlines Credit Cards
export const unitedCreditCards = [
  "none",
  "explorer",
  "quest",
  "club",
  "club-business",
  "business"
] as const;
export type UnitedCreditCardType = typeof unitedCreditCards[number];

// Tier configurations with United specific benefits
export const UNITED_TIER_CONFIGS = {
  "member": {
    name: "MileagePlus Member",
    pqpRequired: 0,
    pqfRequired: 0,
    milesMultiplier: 5, // 5x miles per dollar
    benefits: [
      "Earn miles that don't expire",
      "Award flight flexibility",
      "Free seat selection at check-in"
    ]
  },
  "silver": {
    name: "Premier Silver",
    pqpRequired: 5000,
    pqfRequired: 15,
    milesMultiplier: 7, // 7x miles per dollar
    benefits: [
      "40% bonus miles on flights",
      "Complimentary Economy Plus at check-in",
      "One free checked bag",
      "Priority check-in and boarding"
    ]
  },
  "gold": {
    name: "Premier Gold",
    pqpRequired: 10000,
    pqfRequired: 30,
    milesMultiplier: 8, // 8x miles per dollar
    benefits: [
      "60% bonus miles on flights",
      "Complimentary Economy Plus at booking",
      "Two free checked bags",
      "Priority security and boarding",
      "Free same-day changes"
    ]
  },
  "platinum": {
    name: "Premier Platinum",
    pqpRequired: 15000,
    pqfRequired: 45,
    milesMultiplier: 9, // 9x miles per dollar
    benefits: [
      "80% bonus miles on flights",
      "Complimentary Economy Plus and preferred seats",
      "Three free checked bags",
      "Priority everything",
      "Free upgrades on select routes"
    ]
  },
  "1k": {
    name: "Premier 1K",
    pqpRequired: 24000,
    pqfRequired: 60,
    milesMultiplier: 11, // 11x miles per dollar
    benefits: [
      "120% bonus miles on flights",
      "Complimentary Premier Access",
      "Three free checked bags (70 lbs each)",
      "Highest upgrade priority",
      "United Club passes",
      "Global Services consideration"
    ]
  }
} as const;

// Fare type configurations
export const UNITED_FARE_TYPES = {
  "basic-economy": {
    name: "Basic Economy",
    pqpMultiplier: 1, // 1x PQP per dollar
    pqfEligible: false, // No PQF on Basic Economy
  },
  "economy": {
    name: "Economy",
    pqpMultiplier: 1, // 1x PQP per dollar
    pqfEligible: true,
  },
  "premium-plus": {
    name: "Premium Plus",
    pqpMultiplier: 1, // 1x PQP per dollar
    pqfEligible: true,
  },
  "business": {
    name: "Business",
    pqpMultiplier: 1, // 1x PQP per dollar
    pqfEligible: true,
  },
  "first": {
    name: "First",
    pqpMultiplier: 1, // 1x PQP per dollar
    pqfEligible: true,
  }
} as const;

// Credit card configurations
export const UNITED_CREDIT_CARDS = {
  "none": {
    name: "No Card",
    annualFee: 0,
    flightMilesBonus: 0,
    purchaseMultiplier: 0,
    pqpPerDollar: 0,
    pqpCap: 0,
    signUpBonus: 0,
    signUpSpendRequirement: 0,
    freeCheckedBag: false,
    priorityBoarding: false
  },
  "explorer": {
    name: "United Explorer",
    annualFee: 95,
    flightMilesBonus: 2, // 2x miles on United purchases
    purchaseMultiplier: 1, // 1x miles on other purchases
    pqpPerDollar: 1/20, // 1 PQP per $20 spent
    pqpCap: 1000, // Annual PQP cap
    signUpBonus: 60000,
    signUpSpendRequirement: 3000,
    freeCheckedBag: true,
    priorityBoarding: true
  },
  "quest": {
    name: "United Quest",
    annualFee: 250,
    flightMilesBonus: 3, // 3x miles on United purchases
    purchaseMultiplier: 2, // 2x miles on other purchases
    pqpPerDollar: 1/20, // 1 PQP per $20 spent
    pqpCap: 18000, // Annual PQP cap
    signUpBonus: 80000,
    signUpSpendRequirement: 5000,
    freeCheckedBag: true,
    priorityBoarding: true
  },
  "club": {
    name: "United Club",
    annualFee: 525,
    flightMilesBonus: 4, // 4x miles on United purchases
    purchaseMultiplier: 2, // 2x miles on other purchases
    pqpPerDollar: 1/15, // 1 PQP per $15 spent (Club Business rate)
    pqpCap: 28000, // Annual PQP cap
    signUpBonus: 100000,
    signUpSpendRequirement: 5000,
    freeCheckedBag: true,
    priorityBoarding: true
  },
  "club-business": {
    name: "United Club Business",
    annualFee: 525,
    flightMilesBonus: 4, // 4x miles on United purchases
    purchaseMultiplier: 2, // 2x miles on other purchases
    pqpPerDollar: 1/15, // 1 PQP per $15 spent
    pqpCap: 28000, // Annual PQP cap
    signUpBonus: 100000,
    signUpSpendRequirement: 5000,
    freeCheckedBag: true,
    priorityBoarding: true
  },
  "business": {
    name: "United Business",
    annualFee: 99,
    flightMilesBonus: 2, // 2x miles on United purchases
    purchaseMultiplier: 1, // 1x miles on other purchases
    pqpPerDollar: 1/20, // 1 PQP per $20 spent
    pqpCap: 3000, // Annual PQP cap
    signUpBonus: 75000,
    signUpSpendRequirement: 5000,
    freeCheckedBag: true,
    priorityBoarding: true
  }
} as const;

// Calculator input schema
export const unitedCalculatorInputSchema = z.object({
  flightSpending: z.number().min(0),
  fareType: z.enum(unitedFareTypes),
  currentTier: z.enum(unitedTierStatuses),
  flightsTaken: z.number().min(0),
  creditCard: z.enum(unitedCreditCards),
  cardSpending: z.number().min(0),
  includeSignUpBonus: z.boolean(),
  partnerSpending: z.number().min(0)
});

export type UnitedCalculatorInput = z.infer<typeof unitedCalculatorInputSchema>;

// Calculation results interface
export interface UnitedCalculationResults {
  // Miles earned
  totalMiles: number;
  flightMiles: number;
  creditCardMiles: number;
  partnerMiles: number;
  
  // PQP (Premier Qualifying Points)
  totalPQP: number;
  flightPQP: number;
  cardPQP: number;
  partnerPQP: number;
  
  // PQF (Premier Qualifying Flights)
  totalPQF: number;
  
  // Status progress
  currentTier: UnitedTierStatus;
  nextTier: UnitedTierStatus | null;
  pqpToNextTier: number;
  pqfToNextTier: number;
  percentToNextTier: number;
  
  // Financial analysis
  milesValue: number;
  returnOnSpend: number;
}