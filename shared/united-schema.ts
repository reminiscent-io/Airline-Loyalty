import { z } from "zod";

// United Airlines Tier Status
export const unitedTierStatuses = ["member", "silver", "gold", "platinum", "1k", "global-services"] as const;
export type UnitedTierStatus = typeof unitedTierStatuses[number];

// Display-only tiers (not used in calculations)
export const unitedGhostTiers = ["global-services"] as const;
export type UnitedGhostTier = typeof unitedGhostTiers[number];

// United Airlines Fare Types
export const unitedFareTypes = ["basic-economy", "economy", "economy-plus", "premium-plus", "business", "first"] as const;
export type UnitedFareType = typeof unitedFareTypes[number];

// United Airlines Credit Cards
export const unitedCreditCards = [
  "none",
  "gateway",
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
    pqpRequired: 6000,
    pqfRequired: 0, // PQF only needed for alternative path
    alternativePath: { pqp: 5000, pqf: 15 }, // Alternative combined path
    milesMultiplier: 7, // 5 base + 2 bonus
    benefits: [
      "7 miles per dollar",
      "One free checked bag",
      "Premier Access boarding (Group 2)",
      "Complimentary Economy Plus at check-in",
      "40% bonus miles"
    ]
  },
  "gold": {
    name: "Premier Gold",
    pqpRequired: 12000,
    pqfRequired: 0,
    alternativePath: { pqp: 10000, pqf: 30 },
    milesMultiplier: 8, // 5 base + 3 bonus
    benefits: [
      "8 miles per dollar",
      "Two free checked bags",
      "Premier Access boarding (Group 1)",
      "Complimentary Economy Plus seating",
      "Same-day flight changes",
      "60% bonus miles"
    ]
  },
  "platinum": {
    name: "Premier Platinum",
    pqpRequired: 18000,
    pqfRequired: 0,
    alternativePath: { pqp: 15000, pqf: 45 },
    milesMultiplier: 9, // 5 base + 4 bonus
    benefits: [
      "9 miles per dollar",
      "Three free checked bags",
      "Complimentary upgrades (72 hours before)",
      "Premier Access (priority security + boarding)",
      "280 PlusPoints annually",
      "80% bonus miles"
    ]
  },
  "1k": {
    name: "Premier 1K",
    pqpRequired: 28000,
    pqfRequired: 0,
    alternativePath: { pqp: 22000, pqf: 60 },
    milesMultiplier: 11, // 5 base + 6 bonus
    benefits: [
      "11 miles per dollar",
      "Three free checked bags",
      "Highest upgrade priority (96 hours before)",
      "Premier Access throughout airport",
      "280 PlusPoints annually",
      "United Club lounge access on day of travel",
      "120% bonus miles"
    ]
  },
  "global-services": {
    name: "Global Services",
    pqpRequired: -1, // Invitation only, no specific requirement
    pqfRequired: -1, // Invitation only
    milesMultiplier: 11, // Same as Premier 1K
    isGhostTier: true,
    invitationOnly: true,
    benefits: [
      "Pre-boarding privilege",
      "Enhanced customer support",
      "Most benefits unpublished",
      "All Premier 1K benefits plus exclusive perks"
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
  "economy-plus": {
    name: "Economy Plus",
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
  "gateway": {
    name: "United Gateway",
    annualFee: 0,
    flightMilesBonus: 2, // 2x miles on United
    purchaseMultiplier: 1,
    pqpPerDollar: 0, // Does NOT earn PQP
    pqpCap: 0,
    signUpBonus: 30000,
    signUpSpendRequirement: 1000,
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
    annualFee: 350,
    flightMilesBonus: 3, // 3x miles on United purchases
    purchaseMultiplier: 2, // 2x miles on other purchases
    pqpPerDollar: 1/20, // 1 PQP per $20 spent
    pqpCap: 18000, // Annual PQP cap
    annualPQPBonus: 1000, // 1,000 PQP annually
    signUpBonus: 70000,
    signUpBonusPQP: 1000, // 1,000 PQP with sign-up bonus
    signUpSpendRequirement: 4000,
    freeCheckedBag: true,
    priorityBoarding: true
  },
  "club": {
    name: "United Club",
    annualFee: 650,
    flightMilesBonus: 4, // 4x miles on United purchases
    purchaseMultiplier: 2, // 2x miles on other purchases
    pqpPerDollar: 1/15, // 1 PQP per $15 spent (no cap)
    pqpCap: 0, // No PQP cap
    annualPQPBonus: 1500, // 1,500 PQP annually
    signUpBonus: 80000,
    signUpBonusPQP: 2000, // 2,000 PQP with sign-up bonus
    signUpSpendRequirement: 5000,
    freeCheckedBag: true,
    priorityBoarding: true,
    clubAccess: true
  },
  "club-business": {
    name: "United Club Business",
    annualFee: 650,
    flightMilesBonus: 4, // 4x miles on United purchases
    purchaseMultiplier: 2, // 2x miles on other purchases
    pqpPerDollar: 1/15, // 1 PQP per $15 spent  
    pqpCap: 0, // No PQP cap
    annualPQPBonus: 1500, // 1,500 PQP annually
    signUpBonus: 80000,
    signUpBonusPQP: 2000, // 2,000 PQP with sign-up bonus
    signUpSpendRequirement: 5000,
    freeCheckedBag: true,
    priorityBoarding: true,
    clubAccess: true
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

// Calculator tiers (excluding ghost tiers)
export const unitedCalculatorTierStatuses = ["member", "silver", "gold", "platinum", "1k"] as const;
export type UnitedCalculatorTierStatus = typeof unitedCalculatorTierStatuses[number];

// Calculator input schema
export const unitedCalculatorInputSchema = z.object({
  flightSpending: z.number().min(0),
  fareType: z.enum(unitedFareTypes),
  currentTier: z.enum(unitedCalculatorTierStatuses),
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
  qualifiesForNextTier: boolean;
  qualificationPath: string;
  meetsFlightMinimum: boolean;
  
  // Financial analysis
  milesValue: number;
  totalCost: number;
  returnOnSpend: number;
}