import { z } from "zod";

// 2026 Atmos Tier Status
export const atmosTierStatuses = ["member", "silver", "gold", "platinum", "titanium"] as const;
export type AtmosTierStatus = typeof atmosTierStatuses[number];

// 2026 Earning Methods
export const atmosEarningMethods = ["distance", "spend", "segment"] as const;
export type AtmosEarningMethod = typeof atmosEarningMethods[number];

// Detailed Fare Classes for 2026
export const atmosFareClasses = [
  // Saver
  "U",
  // Economy
  "N", "M", "I", "H", "G", "K", "L", "Z", "O", // Basic economy
  "Q", "V", "B", "S", // Standard economy
  "Y", "W", "X", // Full economy
  // Premium Cabin
  "C", "A", "D", // Business discount
  "P", // Business standard
  "J", // Business full
  "F" // First class
] as const;
export type AtmosFareClass = typeof atmosFareClasses[number];

// Simplified Fare Types for UI
export const atmosFareTypes = ["saver", "economy", "premium-economy", "business", "first"] as const;
export type AtmosFareType = typeof atmosFareTypes[number];

// 2026 Atmos Credit Cards
export const atmosCreditCards = [
  "none",
  "summit", // New premium card
  "ascent", // New standard card
  "business",
  "hawaiian-consumer", // Barclays
  "hawaiian-boh" // Bank of Hawaii
] as const;
export type AtmosCreditCardType = typeof atmosCreditCards[number];

// Community types for 2026
export const atmosCommunities = [
  "none",
  "huakai", // Hawaii residents
  "club49", // Alaska residents
  "global-locals", // Non-US members
  "culinary-journeys",
  "active-escapes",
  "families-on-the-go"
] as const;
export type AtmosCommunity = typeof atmosCommunities[number];

// 2026 Tier configurations
export const ATMOS_TIER_CONFIGS = {
  "member": {
    name: "Basic Member",
    statusPointsRequired: 0,
    redeemablePointsMultiplier: 1.0, // No bonus
    oneworldStatus: null,
    benefits: [
      "Earn points on flights",
      "No blackout dates on awards",
      "Basic seat selection",
      "Free Starlink Wi-Fi (2026-2027)"
    ]
  },
  "silver": {
    name: "Atmos Silver",
    statusPointsRequired: 20000,
    redeemablePointsMultiplier: 1.25, // 25% bonus
    oneworldStatus: "Ruby",
    benefits: [
      "25% bonus points on flights",
      "Priority check-in and boarding (Group A)",
      "Preferred seating",
      "1 free checked bag", // Reduced from 2 in 2026
      "Complimentary upgrades (space available)",
      "First checked bag free for up to 6 guests"
    ]
  },
  "gold": {
    name: "Atmos Gold", 
    statusPointsRequired: 40000,
    redeemablePointsMultiplier: 1.5, // 50% bonus
    oneworldStatus: "Sapphire",
    benefits: [
      "50% bonus points on flights",
      "First Class upgrades within North America",
      "Premium Class upgrades on Hawaiian",
      "Upgrade waitlist opens 72 hours before",
      "Oneworld Sapphire status",
      "2 free checked bags",
      "International lounge access when flying oneworld"
    ]
  },
  "platinum": {
    name: "Atmos Platinum",
    statusPointsRequired: 80000, // Increased from 75K
    redeemablePointsMultiplier: 2.0, // 100% bonus
    oneworldStatus: "Emerald",
    benefits: [
      "100% bonus points on flights",
      "Upgrade waitlist opens 120 hours before",
      "Premium Class often confirmed at booking",
      "Oneworld Emerald status",
      "3 free checked bags",
      "Free same-day changes and standby",
      "Complimentary drink or chocolate in Main",
      "Companion upgrades (+1 guest)"
    ]
  },
  "titanium": {
    name: "Atmos Titanium",
    statusPointsRequired: 135000, // Increased from 100K
    redeemablePointsMultiplier: 2.5, // 150% bonus
    oneworldStatus: "Emerald",
    benefits: [
      "150% bonus points on flights",
      "Global business class upgrades (Spring 2026)",
      "Complimentary meal in Main Cabin",
      "Highest upgrade priority",
      "Avis President's Club status match",
      "CLEAR Plus discount",
      "All Platinum benefits plus more"
    ]
  }
} as const;

// 2026 Fare Class Configurations (detailed earning percentages)
export const ATMOS_FARE_CLASSES = {
  // Saver fare
  "U": { name: "Saver", basePoints: 30, statusPoints: 30, category: "saver" },
  // Economy fares
  "N": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "M": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "I": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "H": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "G": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "K": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "L": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "Z": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "O": { name: "Basic Economy", basePoints: 100, statusPoints: 100, category: "economy" },
  "Q": { name: "Economy", basePoints: 125, statusPoints: 125, category: "economy" },
  "V": { name: "Economy", basePoints: 125, statusPoints: 125, category: "economy" },
  "B": { name: "Economy", basePoints: 125, statusPoints: 125, category: "economy" },
  "S": { name: "Economy", basePoints: 125, statusPoints: 125, category: "economy" },
  "Y": { name: "Full Economy", basePoints: 150, statusPoints: 150, category: "economy" },
  "W": { name: "Full Economy", basePoints: 150, statusPoints: 150, category: "economy" },
  "X": { name: "Full Economy", basePoints: 150, statusPoints: 150, category: "economy" },
  // Premium cabin fares
  "C": { name: "Business Discount", basePoints: 150, statusPoints: 150, category: "business" },
  "A": { name: "Business Discount", basePoints: 150, statusPoints: 150, category: "business" },
  "D": { name: "Business Discount", basePoints: 150, statusPoints: 150, category: "business" },
  "P": { name: "Business Standard", basePoints: 175, statusPoints: 175, category: "business" },
  "J": { name: "Business Full", basePoints: 200, statusPoints: 200, category: "business" },
  "F": { name: "First Class", basePoints: 200, statusPoints: 200, category: "first" }
} as const;

// Simplified fare types for UI
export const ATMOS_FARE_TYPES = {
  "saver": {
    name: "Saver (U)",
    fareClasses: ["U"],
    displayMultiplier: "30%"
  },
  "economy": {
    name: "Economy",
    fareClasses: ["N", "M", "I", "H", "G", "K", "L", "Z", "O", "Q", "V", "B", "S", "Y", "W", "X"],
    displayMultiplier: "100-150%"
  },
  "premium-economy": {
    name: "Premium Economy",
    fareClasses: ["W", "Y"],
    displayMultiplier: "150%"
  },
  "business": {
    name: "Business",
    fareClasses: ["C", "A", "D", "P", "J"],
    displayMultiplier: "150-200%"
  },
  "first": {
    name: "First Class",
    fareClasses: ["F"],
    displayMultiplier: "200% (350% Int'l)"
  }
} as const;

// 2026 Credit card configurations
export const ATMOS_CREDIT_CARDS = {
  "none": {
    name: "No Card",
    annualFee: 0,
    airlinePointsMultiplier: 0,
    otherPointsMultiplier: 0,
    statusPointsPerDollar: 0,
    statusPointsCap: null,
    anniversaryBonus: 0,
    companionFare: null,
    freeCheckedBag: false,
    signUpBonus: 0,
    signUpSpendRequirement: 0,
    loungeAccess: false,
    features: []
  },
  "summit": {
    name: "Atmos Summit Visa Infinite",
    annualFee: 395,
    airlinePointsMultiplier: 3, // 3x on Alaska/Hawaiian
    otherPointsMultiplier: 1, // 1x on all other
    foreignPointsMultiplier: 3, // 3x on ALL foreign purchases
    diningPointsMultiplier: 3, // 3x on dining
    statusPointsPerDollar: 0.5, // 1 status point per $2 spent (no cap)
    statusPointsCap: null,
    anniversaryBonus: 10000, // 10K status points annually
    companionFare: "Global (25K/100K points)",
    freeCheckedBag: true,
    signUpBonus: 80000,
    signUpSpendRequirement: 4000,
    loungeAccess: "8 Alaska Lounge passes/year",
    features: [
      "Global Companion Award (25K points)",
      "Second Global Companion (100K) after $60K spend",
      "8 Wi-Fi passes per year",
      "Primary rental car coverage",
      "Waived partner award fees"
    ]
  },
  "ascent": {
    name: "Atmos Ascent Visa Signature",
    annualFee: 95,
    airlinePointsMultiplier: 3, // 3x on Alaska/Hawaiian
    otherPointsMultiplier: 1, // 1x on all other
    gasPointsMultiplier: 2, // 2x at gas/EV charging
    transitPointsMultiplier: 2, // 2x on local transit/ride-share
    streamingPointsMultiplier: 2, // 2x on cable/streaming
    statusPointsPerDollar: 0.333, // 1 status point per $3 spent
    statusPointsCap: null, // No cap starting 2026
    anniversaryBonus: 0,
    companionFare: "$99 (plus taxes from $23)",
    freeCheckedBag: true,
    signUpBonus: 60000,
    signUpSpendRequirement: 3000,
    loungeAccess: false,
    features: [
      "$99 Companion Fare after $6K annual spend",
      "20% back on inflight purchases",
      "Priority boarding"
    ]
  },
  "business": {
    name: "Atmos Business Visa",
    annualFee: 95,
    airlinePointsMultiplier: 3, // 3x on Alaska/Hawaiian
    otherPointsMultiplier: 1, // 1x on all other
    gasPointsMultiplier: 2, // 2x at gas/EV charging
    shippingPointsMultiplier: 2, // 2x on shipping
    transitPointsMultiplier: 2, // 2x on local transit
    statusPointsPerDollar: 0.333, // 1 status point per $3 spent
    statusPointsCap: null, // No cap starting 2026
    anniversaryBonus: 0,
    companionFare: "$99 annually",
    freeCheckedBag: true,
    signUpBonus: 60000,
    signUpSpendRequirement: 4000,
    loungeAccess: false,
    features: [
      "$99 Companion Fare annually",
      "Preferred boarding",
      "Employee cards at no cost"
    ]
  },
  "hawaiian-consumer": {
    name: "Hawaiian World Elite (Barclays)",
    annualFee: 99,
    airlinePointsMultiplier: 3, // 3x on Hawaiian
    otherPointsMultiplier: 1, // 1x on all other
    gasPointsMultiplier: 2, // 2x at gas
    diningPointsMultiplier: 2, // 2x at dining
    groceryPointsMultiplier: 2, // 2x at grocery
    statusPointsPerDollar: 0, // Does NOT earn status points
    statusPointsCap: null,
    anniversaryBonus: 0,
    companionFare: "$100 discount annually",
    freeCheckedBag: true,
    signUpBonus: 70000,
    signUpSpendRequirement: 2000,
    loungeAccess: false,
    features: [
      "2 free checked bags on Alaska/Hawaiian",
      "$100 annual inflight credit (elite members)",
      "No foreign transaction fees"
    ]
  },
  "hawaiian-boh": {
    name: "Hawaiian Bank of Hawaii",
    annualFee: 99,
    airlinePointsMultiplier: 3, // 3x on Hawaiian
    otherPointsMultiplier: 1, // 1x on all other
    gasPointsMultiplier: 2, // 2x at gas
    diningPointsMultiplier: 2, // 2x at dining
    groceryPointsMultiplier: 2, // 2x at grocery
    statusPointsPerDollar: 0, // Does NOT earn status points
    statusPointsCap: null,
    anniversaryBonus: 0,
    companionFare: "$100 discount annually",
    freeCheckedBag: false,
    signUpBonus: 60000,
    signUpSpendRequirement: 2000,
    loungeAccess: false,
    features: [
      "0% intro APR for 15 months on balance transfers",
      "No foreign transaction fees"
    ]
  }
} as const;

// 2026 Calculator input schema
export const atmosCalculatorInputSchema = z.object({
  // Earning method selection (new for 2026)
  earningMethod: z.enum(atmosEarningMethods),
  
  // Flight details
  flightSpending: z.number().min(0),
  flightDistance: z.number().min(0), // For distance-based earning
  segments: z.number().min(0), // For segment-based earning
  fareClass: z.enum(atmosFareClasses),
  isInternational: z.boolean(),
  
  // Status
  currentTier: z.enum(atmosTierStatuses),
  
  // Credit card
  creditCard: z.enum(atmosCreditCards),
  cardSpending: z.number().min(0),
  includeSignUpBonus: z.boolean(),
  
  // Partner and awards
  partnerSpending: z.number().min(0),
  awardPointsRedeemed: z.number().min(0), // For status point earning from redemptions
  
  // Community selection
  community: z.enum(atmosCommunities).optional()
});

export type AtmosCalculatorInput = z.infer<typeof atmosCalculatorInputSchema>;

// 2026 Calculation results interface
export interface AtmosCalculationResults {
  // Points earned (2026 terminology)
  totalRedeemablePoints: number;
  flightRedeemablePoints: number;
  creditCardRedeemablePoints: number;
  partnerRedeemablePoints: number;
  
  // Status points (new for 2026)
  totalStatusPoints: number;
  flightStatusPoints: number;
  creditCardStatusPoints: number;
  awardRedemptionStatusPoints: number;
  
  // Status progress
  currentTier: AtmosTierStatus;
  nextTier: AtmosTierStatus | null;
  statusPointsToNextTier: number;
  percentToNextTier: number;
  
  // 2026 Head Start Bonus (if applicable)
  headStartBonus: number;
  
  // Financial analysis
  pointsValue: number;
  returnOnSpend: number;
  
  // Special benefits
  companionFareAvailable: boolean;
  freeCheckedBagValue: number;
  loungeAccessValue: number;
  
  // Earning method breakdown
  earningMethodUsed: AtmosEarningMethod;
  baseEarningRate: string; // Display format like "1 point per mile"
}