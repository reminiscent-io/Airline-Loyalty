# Southwest Rapid Rewards Program

## Point Currencies

Southwest has **three separate point types** — this is the most important thing to understand:

| Currency | Abbreviation | Purpose | Earns From |
|----------|-------------|---------|------------|
| Rapid Rewards | RR | Redeemable for flights | Flights, cards, partners |
| Companion Qualifying Points | CQP | Companion Pass progress | Flights, cards, partners |
| Tier Qualifying Points | TQP | A-List / A-List Preferred status | Flights only + card boost |

**Key distinction**: Partner points count toward RR and CQP but **NOT** TQP. This is the most commonly misunderstood rule.

## Tier Qualification (OR Logic)

Qualification uses **OR** — meet either threshold, not both:

| Tier | Flights OR | TQP |
|------|-----------|-----|
| A-List | 20 flights | 35,000 TQP |
| A-List Preferred | 40 flights | 70,000 TQP |

## RR Tier Bonuses

Only RR points get the tier bonus. CQP and TQP earn at the base rate regardless of status.

- Member: 0% bonus
- A-List: +25% on flight RR points
- A-List Preferred: +100% on flight RR points

## Fare Types

| Fare | Points per Dollar (all 3 types) |
|------|-------------------------------|
| Basic | 2x |
| Choice | 6x |
| Choice Preferred | 10x |
| Choice Extra | 14x |

## Companion Pass (OR Logic)

Qualify via **either**:
- 100 qualifying flights, OR
- 135,000 CQP

CQP sources include flight base points, card flight bonuses, card non-flight spending, sign-up bonuses, annual CQP bonuses, and partner points.

## Credit Card Integration

Cards add bonus points **on top of** fare-based earning for flights:

- **Flight RR/CQP bonus**: Additional 2-4 points per dollar on Southwest flights (varies by card)
- **Non-flight RR/CQP**: 1x on all non-Southwest purchases
- **TQP boost**: Some cards award bonus TQP per $5,000 in **total** card spending (flight + non-flight combined)
- **Sign-up bonus**: Counts toward both RR and CQP; requires total card spend (flight + non-flight) to meet threshold
- **Annual bonus**: Separate values for RR and CQP (CQP bonus is much larger, e.g., 13K-19K CQP vs 3K-9K RR)

## Value Assumptions

- RR point value: **1.4 cents** per point
- Total cost for ROI: flight spending + card spending + annual fee

## Code Locations

- Schema & configs: `shared/schema.ts`
- Calculator logic: `server/southwest-calculator.ts`
- Components: `client/src/components/southwest/`
- Page: `client/src/pages/southwest.tsx`
