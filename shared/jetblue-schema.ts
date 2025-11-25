import { z } from "zod";

// JetBlue Tier Status
export const jetblueTierStatuses = ["trueblue", "mosaic-1", "mosaic-2", "mosaic-3", "mosaic-4"] as const;
export type JetBlueTierStatus = typeof jetblueTierStatuses[number];

// JetBlue Fare Types
export const jetblueFareTypes = ["blue-basic", "blue", "blue-plus", "blue-extra", "mint"] as const;
export type JetBlueFareType = typeof jetblueFareTypes[number];

// JetBlue Credit Cards
export const jetblueCreditCards = [
  "none",
  "jetblue",
  "jetblue-plus",
  "jetblue-business"
] as const;
export type JetBlueCreditCardType = typeof jetblueCreditCards[number];

// Tier configurations with JetBlue specific benefits
export const JETBLUE_TIER_CONFIGS = {
  "trueblue": {
    name: "TrueBlue Member",
    tilesRequired: 0,
    mosaicBonus: 0, // No extra points per dollar for basic members
    benefits: [
      "Earn TrueBlue points",
      "No blackout dates",
      "Points never expire",
      "Family pooling"
    ]
  },
  "mosaic-1": {
    name: "Mosaic 1",
    tilesRequired: 50,
    mosaicBonus: 3, // +3 extra points per dollar on flights
    benefits: [
      "3 extra points per dollar on flights",
      "Unlimited free changes/cancellations",
      "Early boarding",
      "2 free checked bags",
      "Expedited security"
    ]
  },
  "mosaic-2": {
    name: "Mosaic 2",
    tilesRequired: 100,
    mosaicBonus: 3, // +3 extra points per dollar on flights
    benefits: [
      "3 extra points per dollar on flights",
      "Even More Space seats free",
      "2 free checked bags",
      "Expedited security",
      "Dedicated phone line"
    ]
  },
  "mosaic-3": {
    name: "Mosaic 3",
    tilesRequired: 150,
    mosaicBonus: 3, // +3 extra points per dollar on flights
    benefits: [
      "3 extra points per dollar on flights",
      "Even More Space seats free",
      "Mint upgrade certificates",
      "3 free checked bags",
      "Priority phone line"
    ]
  },
  "mosaic-4": {
    name: "Mosaic 4",
    tilesRequired: 250,
    mosaicBonus: 3, // +3 extra points per dollar on flights
    benefits: [
      "3 extra points per dollar on flights",
      "Unlimited Mint upgrades (space available)",
      "Complimentary Even More Speed",
      "Lounge passes",
      "Global Entry/TSA PreCheck credit"
    ]
  }
} as const;

// Fare type configurations
export const JETBLUE_FARE_TYPES = {
  "blue-basic": {
    name: "Blue Basic",
    basePoints: 2, // 2 points per dollar when booked direct (1 base + 1 bonus)
    tileEligible: true, // Blue Basic DOES earn tiles
  },
  "blue": {
    name: "Blue",
    basePoints: 6, // 6 points per dollar when booked direct (3 base + 3 bonus)
    tileEligible: true,
  },
  "blue-plus": {
    name: "Blue Plus",
    basePoints: 6, // 6 points per dollar when booked direct (3 base + 3 bonus)
    tileEligible: true,
  },
  "blue-extra": {
    name: "Blue Extra",
    basePoints: 6, // 6 points per dollar when booked direct (3 base + 3 bonus)
    tileEligible: true,
  },
  "mint": {
    name: "Mint",
    basePoints: 6, // 6 points per dollar when booked direct (3 base + 3 bonus)
    tileEligible: true,
  }
} as const;

// Credit card configurations
export const JETBLUE_CREDIT_CARDS = {
  "none": {
    name: "No Card",
    annualFee: 0,
    flightPointsBonus: 0,
    purchaseMultiplier: 0,
    mosaicBoost: false,
    freeCheckedBag: false,
    signUpBonus: 0,
    signUpSpendRequirement: 0,
    annualBonus: 0,
  },
  "jetblue": {
    name: "JetBlue",
    annualFee: 0,
    flightPointsBonus: 3, // 3x points on JetBlue
    purchaseMultiplier: 1, // 1x on other purchases
    mosaicBoost: false,
    freeCheckedBag: false,
    signUpBonus: 10000,
    signUpSpendRequirement: 1000,
    annualBonus: 0,
  },
  "jetblue-plus": {
    name: "JetBlue Plus",
    annualFee: 99,
    flightPointsBonus: 6, // 6x points on JetBlue
    purchaseMultiplier: 2, // 2x restaurants/grocery
    mosaicBoost: true, // Counts toward Mosaic
    freeCheckedBag: true,
    signUpBonus: 80000, // 60k-80k points based on current offer
    signUpSpendRequirement: 2000, // Spend requirement varies $1k-$2k
    annualBonus: 5000, // Annual bonus points
  },
  "jetblue-business": {
    name: "JetBlue Business",
    annualFee: 99,
    flightPointsBonus: 6, // 6x points on JetBlue
    purchaseMultiplier: 2, // 2x on office supplies, etc.
    mosaicBoost: true,
    freeCheckedBag: true,
    signUpBonus: 80000, // 60k-80k points based on current offer
    signUpSpendRequirement: 2000, // $2,000 spend requirement
    annualBonus: 6000,
  }
} as const;

// Calculator input schema
export const jetblueCalculatorInputSchema = z.object({
  flightSpending: z.number().min(0),
  fareType: z.enum(jetblueFareTypes),
  currentTier: z.enum(jetblueTierStatuses),
  segments: z.number().min(0),
  creditCard: z.enum(jetblueCreditCards),
  cardSpending: z.number().min(0),
  includeSignUpBonus: z.boolean(),
  partnerSpending: z.number().min(0)
});

export type JetBlueCalculatorInput = z.infer<typeof jetblueCalculatorInputSchema>;

// Calculation results interface
export interface JetBlueCalculationResults {
  // Points earned
  totalPoints: number;
  flightPoints: number;
  creditCardPoints: number;
  partnerPoints: number;
  
  // Mosaic qualification
  tilesEarned: number;
  segmentsFlown: number;
  
  // Status progress
  currentTier: JetBlueTierStatus;
  nextTier: JetBlueTierStatus | null;
  tilesToNextTier: number;
  segmentsToNextTier: number;
  percentToNextTier: number;
  
  // Financial analysis
  pointsValue: number;
  totalCost: number;
  returnOnSpend: number;
  
  // Special benefits
  freeCheckedBagValue: number;
  mosaicBoostApplied: boolean;
}