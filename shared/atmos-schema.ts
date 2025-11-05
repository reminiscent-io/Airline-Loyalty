import { z } from "zod";

// Atmos Tier Status (Alaska + Hawaiian merged)
export const atmosTierStatuses = ["member", "mvp", "mvp-gold", "mvp-gold-75k", "mvp-gold-100k"] as const;
export type AtmosTierStatus = typeof atmosTierStatuses[number];

// Atmos Fare Types
export const atmosFareTypes = ["saver", "main", "first", "business"] as const;
export type AtmosFareType = typeof atmosFareTypes[number];

// Atmos Credit Cards
export const atmosCreditCards = [
  "none",
  "alaska-personal",
  "alaska-business",
  "hawaiian-personal",
  "hawaiian-business"
] as const;
export type AtmosCreditCardType = typeof atmosCreditCards[number];

// Tier configurations with Atmos specific benefits
export const ATMOS_TIER_CONFIGS = {
  "member": {
    name: "Basic Member",
    milesRequired: 0,
    segmentsRequired: 0,
    milesMultiplier: 5, // 5x miles per dollar
    benefits: [
      "Earn miles on flights",
      "No blackout dates on awards",
      "Basic seat selection"
    ]
  },
  "mvp": {
    name: "MVP",
    milesRequired: 25000,
    segmentsRequired: 30,
    milesMultiplier: 7, // 7x miles per dollar (40% bonus)
    benefits: [
      "50% mileage bonus",
      "Complimentary premium seats",
      "Priority check-in and boarding",
      "2 free checked bags"
    ]
  },
  "mvp-gold": {
    name: "MVP Gold",
    milesRequired: 50000,
    segmentsRequired: 60,
    milesMultiplier: 8, // 8x miles per dollar (60% bonus)
    benefits: [
      "100% mileage bonus",
      "First class upgrades at check-in",
      "Preferred seats at booking",
      "Priority security line access",
      "2 free checked bags"
    ]
  },
  "mvp-gold-75k": {
    name: "MVP Gold 75K",
    milesRequired: 75000,
    segmentsRequired: 90,
    milesMultiplier: 9.25, // 9.25x miles per dollar (85% bonus)
    benefits: [
      "125% mileage bonus",
      "50K bonus miles annually",
      "Upgrades at booking (U class)",
      "4 upgrade certificates",
      "Lounge membership discount"
    ]
  },
  "mvp-gold-100k": {
    name: "MVP Gold 100K",
    milesRequired: 100000,
    segmentsRequired: 120,
    milesMultiplier: 10, // 10x miles per dollar (100% bonus)
    benefits: [
      "150% mileage bonus",
      "Choice benefit selection",
      "Unlimited upgrades (U class)",
      "Priority everything",
      "Enhanced partner benefits"
    ]
  }
} as const;

// Fare type configurations
export const ATMOS_FARE_TYPES = {
  "saver": {
    name: "Saver",
    baseMultiplier: 0.5, // 50% of miles
    upgradeEligible: false,
  },
  "main": {
    name: "Main Cabin",
    baseMultiplier: 1, // 100% of miles
    upgradeEligible: true,
  },
  "first": {
    name: "First Class",
    baseMultiplier: 1.5, // 150% of miles
    upgradeEligible: false, // Already in first
  },
  "business": {
    name: "Business (Partner)",
    baseMultiplier: 1.5, // 150% of miles
    upgradeEligible: false,
  }
} as const;

// Credit card configurations
export const ATMOS_CREDIT_CARDS = {
  "none": {
    name: "No Card",
    annualFee: 0,
    flightMilesBonus: 0,
    purchaseMultiplier: 0,
    eliteQualifyingMiles: 0,
    companionFare: false,
    freeCheckedBag: false,
    signUpBonus: 0,
    signUpSpendRequirement: 0,
  },
  "alaska-personal": {
    name: "Alaska Personal",
    annualFee: 95,
    flightMilesBonus: 3, // 3x miles on Alaska/Hawaiian
    purchaseMultiplier: 1, // 1x miles on other purchases
    eliteQualifyingMiles: 0, // No EQM from spending
    companionFare: true,
    freeCheckedBag: true,
    signUpBonus: 60000,
    signUpSpendRequirement: 3000,
  },
  "alaska-business": {
    name: "Alaska Business",
    annualFee: 95,
    flightMilesBonus: 3, // 3x miles on Alaska/Hawaiian
    purchaseMultiplier: 2, // 2x on gas, shipping, telecom
    eliteQualifyingMiles: 0,
    companionFare: true,
    freeCheckedBag: true,
    signUpBonus: 70000,
    signUpSpendRequirement: 4000,
  },
  "hawaiian-personal": {
    name: "Hawaiian Personal",
    annualFee: 99,
    flightMilesBonus: 3, // 3x miles on Hawaiian
    purchaseMultiplier: 2, // 2x on gas and grocery
    eliteQualifyingMiles: 0,
    companionFare: false,
    freeCheckedBag: true,
    signUpBonus: 70000,
    signUpSpendRequirement: 2000,
  },
  "hawaiian-business": {
    name: "Hawaiian Business",
    annualFee: 99,
    flightMilesBonus: 3, // 3x miles on Hawaiian
    purchaseMultiplier: 2, // 2x on gas, dining, office supplies
    eliteQualifyingMiles: 0,
    companionFare: false,
    freeCheckedBag: true,
    signUpBonus: 80000,
    signUpSpendRequirement: 2000,
  }
} as const;

// Calculator input schema
export const atmosCalculatorInputSchema = z.object({
  flightSpending: z.number().min(0),
  fareType: z.enum(atmosFareTypes),
  currentTier: z.enum(atmosTierStatuses),
  segments: z.number().min(0),
  creditCard: z.enum(atmosCreditCards),
  cardSpending: z.number().min(0),
  includeSignUpBonus: z.boolean(),
  partnerSpending: z.number().min(0)
});

export type AtmosCalculatorInput = z.infer<typeof atmosCalculatorInputSchema>;

// Calculation results interface
export interface AtmosCalculationResults {
  // Miles earned
  totalMiles: number;
  flightMiles: number;
  creditCardMiles: number;
  partnerMiles: number;
  
  // Elite qualifying
  eliteQualifyingMiles: number;
  eliteQualifyingSegments: number;
  
  // Status progress
  currentTier: AtmosTierStatus;
  nextTier: AtmosTierStatus | null;
  milesToNextTier: number;
  segmentsToNextTier: number;
  percentToNextTier: number;
  
  // Financial analysis
  milesValue: number;
  returnOnSpend: number;
  
  // Special benefits
  companionFareAvailable: boolean;
  freeCheckedBagValue: number;
}