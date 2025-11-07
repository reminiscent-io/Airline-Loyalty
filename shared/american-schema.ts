import { z } from "zod";

// American Airlines Tier Status
export const americanTierStatuses = ["member", "gold", "platinum", "platinum-pro", "executive-platinum", "conciergekey"] as const;
export type AmericanTierStatus = typeof americanTierStatuses[number];

// Display-only tiers (not used in calculations)
export const americanGhostTiers = ["conciergekey"] as const;
export type AmericanGhostTier = typeof americanGhostTiers[number];

// American Airlines Fare Types  
export const americanFareTypes = ["basic-economy", "main-cabin", "premium-economy", "business", "first"] as const;
export type AmericanFareType = typeof americanFareTypes[number];

// American Airlines Credit Cards
export const americanCreditCards = [
  "none",
  "aviator-red",
  "aviator-silver", 
  "aviator-business",
  "citi-platinum",
  "citi-executive"
] as const;
export type AmericanCreditCardType = typeof americanCreditCards[number];

// Tier configurations with American Airlines specific benefits
export const AMERICAN_TIER_CONFIGS = {
  "member": {
    name: "AAdvantage Member",
    loyaltyPointsRequired: 0,
    milesMultiplier: 5, // Total multiplier for display (deprecated, kept for backward compatibility)
    statusBonusPercentage: 0, // 0% bonus on base miles
    benefits: [
      "Earn miles that don't expire",
      "No blackout dates on award flights",
      "Free seat selection at check-in"
    ]
  },
  "gold": {
    name: "Gold",
    loyaltyPointsRequired: 40000,
    milesMultiplier: 7, // Total multiplier for display (deprecated, kept for backward compatibility)
    statusBonusPercentage: 0.4, // 40% bonus on base miles
    benefits: [
      "40% bonus miles on flights",
      "Complimentary Main Cabin Extra seats (when available)",
      "One free checked bag",
      "Priority check-in and boarding"
    ]
  },
  "platinum": {
    name: "Platinum",
    loyaltyPointsRequired: 75000,
    milesMultiplier: 8, // Total multiplier for display (deprecated, kept for backward compatibility)
    statusBonusPercentage: 0.6, // 60% bonus on base miles
    benefits: [
      "60% bonus miles on flights",
      "Complimentary Main Cabin Extra and Preferred seats",
      "Two free checked bags",
      "Priority security and boarding",
      "Complimentary upgrades on 500-mile flights"
    ]
  },
  "platinum-pro": {
    name: "Platinum Pro",
    loyaltyPointsRequired: 125000,
    milesMultiplier: 9, // Total multiplier for display (deprecated, kept for backward compatibility)
    statusBonusPercentage: 0.8, // 80% bonus on base miles
    benefits: [
      "80% bonus miles on flights",
      "Complimentary Main Cabin Extra and Preferred seats",
      "Three free checked bags",
      "Priority security, check-in and boarding",
      "Complimentary upgrades on flights under 900 miles"
    ]
  },
  "executive-platinum": {
    name: "Executive Platinum",
    loyaltyPointsRequired: 200000,
    milesMultiplier: 11, // Total multiplier for display (deprecated, kept for backward compatibility)
    statusBonusPercentage: 1.2, // 120% bonus on base miles
    benefits: [
      "120% bonus miles on flights",
      "Complimentary Main Cabin Extra and Preferred seats",
      "Three free checked bags",
      "Priority everything",
      "Systemwide upgrades (4 per year)",
      "Flagship Lounge and Admirals Club access"
    ]
  },
  "conciergekey": {
    name: "ConciergeKey",
    loyaltyPointsRequired: -1, // Invitation only, no specific requirement
    milesMultiplier: 11, // Same as Executive Platinum
    statusBonusPercentage: 1.2, // 120% bonus on base miles (same as Executive Platinum)
    isGhostTier: true,
    invitationOnly: true,
    benefits: [
      "Pre-boarding privilege",
      "Enhanced customer support",
      "Most benefits unpublished",
      "All Executive Platinum benefits plus exclusive perks"
    ]
  }
} as const;

// Fare type configurations
export const AMERICAN_FARE_TYPES = {
  "basic-economy": {
    name: "Basic Economy",
    baseMultiplier: 2, // 2x miles per dollar
    loyaltyPointsMultiplier: 2,
  },
  "main-cabin": {
    name: "Main Cabin",
    baseMultiplier: 5, // 5x miles per dollar
    loyaltyPointsMultiplier: 5,
  },
  "premium-economy": {
    name: "Premium Economy", 
    baseMultiplier: 5, // 5x miles per dollar
    loyaltyPointsMultiplier: 5,
  },
  "business": {
    name: "Business",
    baseMultiplier: 5, // 5x miles per dollar
    loyaltyPointsMultiplier: 5,
  },
  "first": {
    name: "First",
    baseMultiplier: 5, // 5x miles per dollar
    loyaltyPointsMultiplier: 5,
  }
} as const;

// Credit card configurations
export const AMERICAN_CREDIT_CARDS = {
  "none": {
    name: "No Card",
    annualFee: 0,
    flightMilesBonus: 0,
    purchaseMultiplier: 0,
    loyaltyPointsPerDollar: 0,
    signUpBonus: 0,
    signUpSpendRequirement: 0,
    annualLoyaltyPointsBonus: 0
  },
  "aviator-red": {
    name: "AAdvantage Aviator Red",
    annualFee: 99,
    flightMilesBonus: 2, // 2x miles on AA purchases
    purchaseMultiplier: 1, // 1x miles on other purchases
    loyaltyPointsPerDollar: 1, // 1 LP per dollar spent
    signUpBonus: 60000,
    signUpSpendRequirement: 1000,
    annualLoyaltyPointsBonus: 0
  },
  "aviator-silver": {
    name: "AAdvantage Aviator Silver",
    annualFee: 195,
    flightMilesBonus: 3, // 3x miles on AA purchases
    purchaseMultiplier: 2, // 2x miles on other purchases
    loyaltyPointsPerDollar: 1, // 1 LP per dollar spent
    signUpBonus: 75000,
    signUpSpendRequirement: 2500,
    annualLoyaltyPointsBonus: 10000 // Loyalty Points boost
  },
  "aviator-business": {
    name: "Aviator Business",
    annualFee: 99,
    flightMilesBonus: 2, // 2x miles on AA purchases
    purchaseMultiplier: 1, // 1x miles on other purchases
    loyaltyPointsPerDollar: 1, // 1 LP per dollar spent
    signUpBonus: 65000,
    signUpSpendRequirement: 2000,
    annualLoyaltyPointsBonus: 0
  },
  "citi-platinum": {
    name: "Citi AAdvantage Platinum",
    annualFee: 99,
    flightMilesBonus: 2, // 2x miles on AA purchases
    purchaseMultiplier: 1, // 1x miles on other purchases
    loyaltyPointsPerDollar: 1, // 1 LP per dollar spent
    signUpBonus: 75000,
    signUpSpendRequirement: 4000,
    annualLoyaltyPointsBonus: 0
  },
  "citi-executive": {
    name: "Citi AAdvantage Executive",
    annualFee: 595,
    flightMilesBonus: 4, // 4x miles on AA purchases
    purchaseMultiplier: 2, // 2x miles on other purchases
    loyaltyPointsPerDollar: 1, // 1 LP per dollar spent
    signUpBonus: 100000,
    signUpSpendRequirement: 10000,
    annualLoyaltyPointsBonus: 10000 // Admirals Club membership
  }
} as const;

// Calculator tiers (excluding ghost tiers)
export const americanCalculatorTierStatuses = ["member", "gold", "platinum", "platinum-pro", "executive-platinum"] as const;
export type AmericanCalculatorTierStatus = typeof americanCalculatorTierStatuses[number];

// Calculator input schema
export const americanCalculatorInputSchema = z.object({
  flightSpending: z.number().min(0),
  fareType: z.enum(americanFareTypes),
  currentTier: z.enum(americanCalculatorTierStatuses),
  creditCard: z.enum(americanCreditCards),
  cardSpending: z.number().min(0),
  includeSignUpBonus: z.boolean(),
  partnerSpending: z.number().min(0)
});

export type AmericanCalculatorInput = z.infer<typeof americanCalculatorInputSchema>;

// Calculation results interface
export interface AmericanCalculationResults {
  // Miles earned
  totalMiles: number;
  flightMiles: number;
  creditCardMiles: number;
  partnerMiles: number;
  
  // Loyalty Points
  totalLoyaltyPoints: number;
  flightLoyaltyPoints: number;
  cardLoyaltyPoints: number;
  
  // Status progress
  currentTier: AmericanTierStatus;
  nextTier: AmericanTierStatus | null;
  loyaltyPointsToNextTier: number;
  percentToNextTier: number;
  
  // Financial analysis
  milesValue: number; // Estimated value of miles earned
  returnOnSpend: number; // Percentage return
}