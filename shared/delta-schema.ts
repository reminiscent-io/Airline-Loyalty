import { z } from "zod";

// Delta tier type definition
export type DeltaTierType = "member" | "silver" | "gold" | "platinum" | "diamond" | "delta-360";

// Delta Medallion Status Tier Configuration
export const DELTA_TIER_CONFIGS = {
  "member": {
    name: "SkyMiles Member",
    mqdRequired: 0,
    milesMultiplier: 5, // 5x miles per dollar (base rate)
    benefits: [
      "Base SkyMiles earning rate",
      "Basic SkyMiles benefits",
      "Access to Delta award flights",
      "No blackout dates on award flights"
    ]
  },
  "silver": {
    name: "Silver Medallion",
    mqdRequired: 5000,
    milesMultiplier: 7, // 7x miles per dollar (5 base + 2 bonus)
    benefits: [
      "40% bonus miles on flights",
      "Priority boarding (Zone 1)",
      "Complimentary upgrades",
      "Priority check-in",
      "Free same-day standby"
    ]
  },
  "gold": {
    name: "Gold Medallion",
    mqdRequired: 10000,
    milesMultiplier: 8, // 8x miles per dollar (5 base + 3 bonus)
    benefits: [
      "60% bonus miles on flights",
      "Sky Priority services",
      "Higher upgrade priority",
      "Waived same-day change fees",
      "SkyTeam Elite benefits"
    ]
  },
  "platinum": {
    name: "Platinum Medallion",
    mqdRequired: 15000,
    milesMultiplier: 9, // 9x miles per dollar (5 base + 4 bonus)
    benefits: [
      "80% bonus miles on flights",
      "Choice benefits selection",
      "Higher upgrade priority than Gold",
      "Sky Club access when flying Delta",
      "International lounge access"
    ]
  },
  "diamond": {
    name: "Diamond Medallion",
    mqdRequired: 28000,
    milesMultiplier: 11, // 11x miles per dollar (5 base + 6 bonus)
    benefits: [
      "120% bonus miles on flights",
      "Highest upgrade priority",
      "Sky Club executive membership",
      "Global upgrade certificates (4 per year)",
      "Choice benefits selection (3)",
      "CLEAR Plus membership"
    ]
  },
  "delta-360": {
    name: "Delta 360°",
    mqdRequired: -1, // Invitation only
    milesMultiplier: 11, // Same as Diamond
    isGhostTier: true,
    invitationOnly: true,
    benefits: [
      "All Diamond benefits plus exclusive perks",
      "Dedicated concierge service",
      "Airport meet & assist",
      "Exclusive experiences",
      "Highest priority everything"
    ]
  }
} as const;

// Interface for backward compatibility
export interface DeltaTier {
  name: string;
  mqd: number;
  earningRate: number;
  benefits: string[];
  color: string;
  isGhost?: boolean;
}

// Legacy array format for backward compatibility
export const deltaTiers: DeltaTier[] = Object.entries(DELTA_TIER_CONFIGS).map(([key, config]) => ({
  name: config.name,
  mqd: config.mqdRequired,
  earningRate: config.milesMultiplier - 5, // Convert to bonus rate only
  benefits: [...config.benefits], // Spread to create mutable array
  color: key === "member" ? "bg-gray-100" :
         key === "silver" ? "bg-gray-400" :
         key === "gold" ? "bg-yellow-500" :
         key === "platinum" ? "bg-gray-600" :
         key === "diamond" ? "bg-gray-900" :
         "bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900",
  isGhost: (config as any).isGhostTier
}));

// Fare class base earning rates
export const deltaFareRates: Record<string, number> = {
  "main-basic": 0,      // Main Basic (Basic Economy) - earns 0 miles
  "comfort-basic": 2,   // Comfort Basic - 2 miles per $
  "classic": 5,         // Classic - 5 miles per $
  "refundable": 5,      // Refundable - 5 miles per $
  "extra": 7           // Extra - 7 miles per $
};

// Calculator Input Schema
export const deltaCalculatorInputSchema = z.object({
  annualFlightSpend: z.number().min(0).default(0),
  currentTier: z.enum(["none", "silver", "gold", "platinum", "diamond"]).default("none"),
  cardType: z.enum(["none", "gold", "platinum", "reserve"]).default("none"),
  annualCardSpend: z.number().min(0).default(0),
  fareClass: z.enum(["main-basic", "comfort-basic", "classic", "refundable", "extra"]).default("classic"),
  includeSignUpBonus: z.boolean().optional().default(false)
});

export type DeltaCalculatorInput = z.infer<typeof deltaCalculatorInputSchema>;

// Calculator Results
export interface DeltaCalculationResults {
  totalSkyMiles: number;
  totalMQDs: number;
  currentTier: DeltaTier;
  nextTier: DeltaTier | null;
  mqdToNextTier: number;
  flightSkyMiles: number;
  cardSkyMiles: number;
  mqdFromFlights: number;
  mqdFromCard: number;
  mqdHeadstart: number;
  achievableTier: DeltaTier;
  milesValue: number;
  totalCost: number;
  returnOnSpend: number;
  redemptionDiscountApplied: boolean;
}

// Delta Credit Cards
export interface DeltaCreditCard {
  name: string;
  annualFee: number;
  mqdHeadstart: number;
  mqdEarnRate: number; // MQD per dollar spent (e.g., 0.1 for 1 MQD per $10)
  skyMilesEarnRate: {
    delta: number;
    restaurants: number;
    other: number;
  };
  signupBonus: string;
  benefits: string[];
}

export const deltaCreditCards: DeltaCreditCard[] = [
  {
    name: "Delta SkyMiles Gold",
    annualFee: 99,
    mqdHeadstart: 0,
    mqdEarnRate: 0,
    skyMilesEarnRate: {
      delta: 2,
      restaurants: 2,
      other: 1
    },
    signupBonus: "75,000 SkyMiles after $3,000 spend",
    benefits: [
      "First checked bag free",
      "Priority boarding",
      "20% off in-flight purchases",
      "$200 Delta flight credit (after $15k spend)"
    ]
  },
  {
    name: "Delta SkyMiles Platinum",
    annualFee: 350,
    mqdHeadstart: 2500,
    mqdEarnRate: 0.05, // 1 MQD per $20
    skyMilesEarnRate: {
      delta: 3,
      restaurants: 2,
      other: 1
    },
    signupBonus: "90,000 SkyMiles after $4,000 spend",
    benefits: [
      "$2,500 MQD Headstart",
      "Earn 1 MQD per $20 spent",
      "First checked bag free",
      "Priority boarding",
      "Companion certificate (annual)"
    ]
  },
  {
    name: "Delta SkyMiles Reserve",
    annualFee: 650,
    mqdHeadstart: 2500,
    mqdEarnRate: 0.1, // 1 MQD per $10
    skyMilesEarnRate: {
      delta: 3,
      restaurants: 3,
      other: 1
    },
    signupBonus: "100,000 SkyMiles after $6,000 spend",
    benefits: [
      "$2,500 MQD Headstart",
      "Earn 1 MQD per $10 spent",
      "Sky Club access when flying Delta",
      "First-class companion certificate",
      "CLEAR Plus membership",
      "Centurion Lounge access"
    ]
  }
];

// Benefits by tier
export interface DeltaBenefit {
  category: string;
  general: string;
  silver: string;
  gold: string;
  platinum: string;
  diamond: string;
}

export const deltaBenefits: DeltaBenefit[] = [
  {
    category: "Earning Rate",
    general: "5 miles/$1",
    silver: "7 miles/$1",
    gold: "8 miles/$1",
    platinum: "9 miles/$1",
    diamond: "11 miles/$1"
  },
  {
    category: "Complimentary Upgrades",
    general: "—",
    silver: "✓ Unlimited",
    gold: "✓ Higher priority",
    platinum: "✓ Higher priority",
    diamond: "✓ Highest priority"
  },
  {
    category: "Sky Club Access",
    general: "—",
    silver: "—",
    gold: "—",
    platinum: "With Delta flight",
    diamond: "Executive membership"
  },
  {
    category: "Priority Check-in",
    general: "—",
    silver: "✓",
    gold: "Sky Priority",
    platinum: "Sky Priority",
    diamond: "Sky Priority"
  },
  {
    category: "Priority Boarding",
    general: "—",
    silver: "Zone 1",
    gold: "Sky Priority",
    platinum: "Sky Priority",
    diamond: "Sky Priority"
  },
  {
    category: "Same-Day Changes",
    general: "$75",
    silver: "Free standby",
    gold: "Free confirmed",
    platinum: "Free confirmed",
    diamond: "Free confirmed"
  },
  {
    category: "Choice Benefits",
    general: "—",
    silver: "—",
    gold: "—",
    platinum: "Choose 1",
    diamond: "Choose 3"
  },
  {
    category: "Global Upgrades",
    general: "—",
    silver: "—",
    gold: "—",
    platinum: "—",
    diamond: "4 certificates"
  },
  {
    category: "CLEAR Plus",
    general: "—",
    silver: "—",
    gold: "—",
    platinum: "—",
    diamond: "✓ Free"
  },
  {
    category: "Partner Benefits",
    general: "—",
    silver: "—",
    gold: "SkyTeam Elite",
    platinum: "SkyTeam Elite Plus",
    diamond: "SkyTeam Elite Plus"
  }
];