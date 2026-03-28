# Southwest Rapid Rewards Program

> Last verified: March 2026

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

A-List members board no later than boarding group 5 (effective January 27, 2026).

## RR Tier Bonuses

Only RR points get the tier bonus. CQP and TQP earn at the base rate regardless of status.

- Member: 0% bonus
- A-List: +25% on flight RR points
- A-List Preferred: +100% on flight RR points

## Fare Types

Southwest introduced new fare names in May 2025, replacing the old Wanna Get Away / Business Select structure:

| Fare | Points per Dollar (all 3 types) |
|------|-------------------------------|
| Basic | 2x |
| Choice | 6x |
| Choice Preferred | 10x |
| Choice Extra | 14x |

## Companion Pass (OR Logic)

Qualify via **either**:
- 100 qualifying one-way flights, OR
- 135,000 CQP

CQP sources include flight base points, card flight bonuses, card non-flight spending, sign-up bonuses, annual CQP bonuses, and partner points.

**Card CQP boost**: All Southwest credit cardmembers earn a 10,000 CQP boost each calendar year (deposited by January 31 or within 30 days of account opening).

## Cash + Points (2026 Change)

Starting January 1, 2026, the cash portion of Cash + Points bookings earns Rapid Rewards points, TQP, and CQP on completed flights. Previously only the points portion counted.

## Credit Card Integration

Southwest credit cards are issued by Chase. The current lineup (2026):

| Card | Annual Fee | SW Flight Bonus | Non-Flight | TQP Boost |
|------|-----------|----------------|------------|-----------|
| Plus | $99 | 2x RR/CQP | 1x (2x gas/grocery up to $5K/yr) | — |
| Premier | $149 | 3x RR/CQP | 1x (2x grocery/restaurant up to $8K/yr) | 1,500 per $5K total spend |
| Priority | $229 | 4x RR/CQP | 1x | 2,500 per $5K total spend |
| Premier Business | varies | 3x RR/CQP | 1x | 2,000 per $5K total spend |
| Performance Business | varies | 4x RR/CQP | 1x | 2,500 per $5K total spend |

- **TQP boost**: Earned per $5,000 in **total** card spending (flight + non-flight combined)
- **Sign-up bonus**: Counts toward both RR and CQP; requires total card spend to meet threshold
- **Annual bonus**: Separate values for RR and CQP (CQP bonus is much larger, e.g., 13K-19K CQP vs 3K-9K RR)

## Value Assumptions

- RR point value: **1.4 cents** per point
- Total cost for ROI: flight spending + card spending + annual fee

## Code Locations

- Schema & configs: `shared/southwest-schema.ts`
- Calculator logic: `server/southwest-calculator.ts`
- Components: `client/src/components/southwest/`
- Page: `client/src/pages/southwest.tsx`
