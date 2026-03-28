# Atmos Rewards Program (Alaska + Hawaiian — 2026 Restructure)

> Last verified: March 2026

## Point Currencies

Atmos has **two separate point types** (changed from "miles" in 2025):

| Currency | Purpose | Earns From |
|----------|---------|------------|
| Redeemable Points | Booking flights | Flights (with tier bonus), cards, partners |
| Status Points | Tier qualification | Flights (no tier bonus), select cards, award redemptions, eligible non-airline partners |

**Critical distinction**: Redeemable points get the tier multiplier bonus. Status points do **NOT** get tier bonuses — they always earn at the base rate.

## Tier Qualification (Status Points Only)

| Tier | Status Points | oneworld Mapping |
|------|--------------|-----------------|
| Silver | 20,000 | Ruby |
| Gold | 40,000 | Sapphire |
| Platinum | 80,000 | Emerald |
| Titanium | 135,000 | Emerald |

**2026 increase**: Platinum threshold increased ~7% (from ~75K) and Titanium increased ~35% (from ~100K) compared to 2025.

## Milestone Perks

All Atmos members can select a reward when reaching these status point milestones:

| Milestone | Status Points |
|-----------|--------------|
| 1 | 10,000 |
| 2 | 30,000 |
| 3 | 55,000 |
| 4 | 95,000 |
| 5 | 125,000 |
| 6 | 150,000 |
| 7 | 200,000 |
| 8 | 250,000 |

## Three Earning Methods

Users choose one earning method (can change once per calendar year; defaults to spend-based). All earn both redeemable and status points at the same base rate (before tier bonus):

| Method | Base Rate |
|--------|-----------|
| Distance | 1 point per mile flown |
| Spend | 5 points per $1 spent |
| Segment | 500 points per segment |

Base points are then multiplied by the **fare bucket percentage**.

## Fare Buckets

| Bucket | Base Points (% of earning method) | International First |
|--------|----------------------------------|-------------------|
| Basic Economy | 30% | — |
| Main Cabin | 100% | — |
| Main Cabin Flex | 125% | — |
| Premium Economy | 150% | — |
| Business | 175% | — |
| First | 200% | **350%** |

International First Class gets 350% (an additional 1.75x multiplier applied on top of the 200% base).

## Tier Bonus (Redeemable Points Only)

| Tier | Redeemable Multiplier |
|------|----------------------|
| Member | 1.0x |
| Silver | 1.25x |
| Gold | 1.5x |
| Platinum | 2.0x |
| Titanium | 2.5x |

Status points always earn at 1.0x regardless of tier.

## Status Points from Partners (New 2026)

Members can now earn status points by spending with eligible non-airline partners, including Lyft (1 status point per $1 spent on base fare charges). More partner earning opportunities expected to expand throughout 2026.

## Credit Cards

**Important**: Not all cards earn status points.

| Card | Annual Fee | Airline Rate | Status Points | Sign-up |
|------|-----------|-------------|---------------|---------|
| Summit | $395 | 3x | 1 per $2 + 10K annual (no cap) | 80K |
| Ascent | $95 | 3x | 1 per $3 | 60K |
| Business | $95 | 3x | 1 per $3 | 60K |
| Hawaiian (Barclays) | $99 | 3x | **None** | 70K |
| Hawaiian (BOH) | $99 | 3x | **None** | 60K |

- Status points from cards are earned on **non-flight card spending only** (flight spending earns status points through the flight itself)
- Hawaiian-branded cards earn redeemable points but **zero** status points
- Summit gets 10K anniversary status points; other cards get none
- No status point caps in 2026

## Head Start Bonus (2025 → 2026 Transition)

For members who held status in 2025:
- 2025 Platinum holders: **5,000** status point head start
- 2025 Titanium holders: **20,000** status point head start

## Award Redemption Status Points

Spend-based earning method only: earn 1 status point per 20 redeemable points redeemed. Not available with distance or segment methods.

## Communities

Schema defines community types (Huaka'i, Club 49, Global Locals, etc.) but these are **not used** in the calculator — they're display-only in the UI. Communities with exclusive benefits are planned for later in 2026.

## Other 2026 Updates

- **Free Starlink Wi-Fi**: Being installed across the fleet; free for all Atmos Rewards members
- **Earning method flexibility**: The three earning methods (distance/spend/segment) are launching later in 2026; members can switch once per calendar year

## Value Assumptions

- Point value: **1.6 cents** per point (highest of all airlines in the app)
- Checked bag value: $35
- Lounge pass value: $50 (Summit card gets 8 per year)
- Partner flights: 5x points per dollar

## Code Locations

- Schema & configs: `shared/atmos-schema.ts`
- Calculator logic: `server/atmos-calculator.ts`
- Components: `client/src/components/atmos/`
- Page: `client/src/pages/atmos.tsx`
