import { z } from "zod";

// JetBlue Tier Status
export const jetblueTierStatuses = ["basic", "trueblue", "mosaic", "mosaic-plus", "mosaic-elite"] as const;
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
  "basic": {
    name: "Basic",
    tilesRequired: 0,
    segmentsRequired: 0,
    pointsMultiplier: 3, // 3x points per dollar
    benefits: [
      "Earn TrueBlue points",
      "No blackout dates",
      "Points pooling"
    ]
  },
  "trueblue": {
    name: "TrueBlue",
    tilesRequired: 0,
    segmentsRequired: 0,
    pointsMultiplier: 5, // 5x points per dollar
    benefits: [
      "5 points per dollar",
      "Family pooling",
      "Points never expire",
      "Award availability"
    ]
  },
  "mosaic": {
    name: "Mosaic",
    tilesRequired: 15,
    segmentsRequired: 30,
    pointsMultiplier: 7, // 7x points per dollar
    benefits: [
      "2 extra points per dollar",
      "Unlimited free changes/cancellations",
      "Early boarding",
      "2 free checked bags",
      "Expedited security"
    ]
  },
  "mosaic-plus": {
    name: "Mosaic+",
    tilesRequired: 50,
    segmentsRequired: 75,
    pointsMultiplier: 8, // 8x points per dollar
    benefits: [
      "3 extra points per dollar",
      "Even More Space seats free",
      "Mint upgrade certificates",
      "3 free checked bags",
      "Dedicated phone line"
    ]
  },
  "mosaic-elite": {
    name: "Mosaic Elite",
    tilesRequired: 100,
    segmentsRequired: 140,
    pointsMultiplier: 10, // 10x points per dollar
    benefits: [
      "5 extra points per dollar",
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
    pointsMultiplier: 1, // 1x points
    tileEligible: false,
  },
  "blue": {
    name: "Blue",
    pointsMultiplier: 1, // 1x points
    tileEligible: true,
  },
  "blue-plus": {
    name: "Blue Plus",
    pointsMultiplier: 1, // 1x points
    tileEligible: true,
  },
  "blue-extra": {
    name: "Blue Extra",
    pointsMultiplier: 1, // 1x points
    tileEligible: true,
  },
  "mint": {
    name: "Mint",
    pointsMultiplier: 1, // 1x points but 3x tiles
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
    signUpBonus: 80000,
    signUpSpendRequirement: 1000,
    annualBonus: 5000, // Annual bonus points
  },
  "jetblue-business": {
    name: "JetBlue Business",
    annualFee: 99,
    flightPointsBonus: 6, // 6x points on JetBlue
    purchaseMultiplier: 2, // 2x on office supplies, etc.
    mosaicBoost: true,
    freeCheckedBag: true,
    signUpBonus: 100000,
    signUpSpendRequirement: 1000,
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
  returnOnSpend: number;
  
  // Special benefits
  freeCheckedBagValue: number;
  mosaicBoostApplied: boolean;
}