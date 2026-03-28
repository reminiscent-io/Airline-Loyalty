# American Airlines AAdvantage Program

> Last verified: March 2026

## Point Currencies

American has **two separate currencies**:

| Currency | Purpose | Earns From |
|----------|---------|------------|
| AAdvantage Miles | Redeemable for flights | Flights (with status bonus), cards, partners |
| Loyalty Points (LP) | Elite status qualification | Flights, card spend (1 LP per eligible mile earned) |

**Key distinction**: Loyalty Points are the **only** path to elite status. Miles earned and LP earned are tracked separately. Miles get status bonuses; LP accrues 1:1 with eligible miles earned on card purchases.

## Tier Qualification (Single Metric)

Status is determined purely by Loyalty Points. Thresholds are unchanged for the third consecutive year (2024-2026):

| Tier | LP Required |
|------|------------|
| Gold | 40,000 |
| Platinum | 75,000 |
| Platinum Pro | 125,000 |
| Executive Platinum | 200,000 |
| ConciergeKey | Invitation only (ghost tier) |

## Loyalty Point Rewards

At various LP thresholds, members unlock additional perks including:
- Inflight food-and-beverage coupons
- New York Times All Access subscriptions (coming later 2026)
- Premium retail selections
- 25% LP bonus with select partners for 6 months (up from 20% previously), cap of 25,000 bonus LP

## Miles Earning Formula

```
Total Flight Miles = Base Miles × (1 + Status Bonus %) + Card Flight Bonus
```

- **Base Miles** = Flight Spend × Fare Multiplier
- **Status Bonus**: Gold +40%, Platinum +60%, Platinum Pro +80%, Executive Platinum +120%
- **Card Flight Bonus**: Additional 2-4x miles per dollar on AA purchases (varies by card)

## Fare Types

| Fare | Base Multiplier | LP Multiplier |
|------|----------------|---------------|
| Basic Economy | 2x | 2x |
| Main Cabin | 5x | 5x |
| Premium Economy | 5x | 5x |
| Business | 5x | 5x |
| First | 5x | 5x |

## Loyalty Points Earning

- **From flights**: LP = base flight miles (before status bonus) — i.e., flight spend × fare multiplier
- **From cards**: 1 LP per eligible AAdvantage mile earned on card purchases
- **Annual LP bonus**: Select cards get 10,000 bonus LP (see credit card table)

Note: LP does NOT include partner miles or sign-up bonuses.

## Credit Cards (2026 — Citi Exclusive)

**Major 2026 change**: Barclays Aviator cards are being discontinued. Starting April 24, 2026, Citi becomes the exclusive card partner. Existing Barclays cardholders will be auto-converted to Citi equivalents.

### Barclays → Citi Conversion Map

| Barclays Card | → | Citi Card | Annual Fee |
|--------------|---|-----------|-----------|
| Aviator (no fee) | → | MileUp | $0 |
| Aviator Blue (no fee) | → | Citi / AAdvantage Gold | $50 |
| Aviator Red ($99) | → | Citi / AAdvantage Platinum Select | $99 |
| Aviator Silver ($199) | → | Citi / AAdvantage Globe | $350 |

### Current Citi Card Lineup (Post-Transition)

| Card | Annual Fee | AA Miles | Other Miles | LP Earning | Sign-up |
|------|-----------|----------|-------------|------------|---------|
| MileUp | $0 | 2x | 1x | 1 LP per mile earned | — |
| Citi / AAdvantage Gold | $50 | 2x | 1x | 1 LP per mile earned | — |
| Citi / AAdvantage Platinum Select | $99 | 2x | 1x | 1 LP per mile earned | 75K |
| Citi / AAdvantage Globe | $350 | 3x | 1x | 1 LP per mile earned | 60K |
| Citi / AAdvantage Executive | $595 | 4x | 2x | 1 LP per mile earned (+10K LP annual) | 70K |

Sign-up bonus qualification uses **total** card spend (flight + non-flight).

## Partner Earning

Partner flights earn 5x miles per dollar (flat rate assumption). Partner miles do **not** earn Loyalty Points.

## Other 2026 Updates

- **Free Wi-Fi**: AT&T-sponsored free high-speed Wi-Fi on most domestic flights and select international flights for AAdvantage members
- **Centennial gift**: Limited-edition luggage tag for members qualifying for status from March 1, 2026 onward
- **Expanded redemptions**: Miles usable for PGA Championship, U.S. Soccer matches, and other events

## Value Assumptions

- Mile value: **1.45 cents** per mile
- Total cost for ROI: flight spending + card spending + annual fee + partner spending

## Code Locations

- Schema & configs: `shared/american-schema.ts`
- Calculator logic: `server/american-calculator.ts`
- Components: `client/src/components/american/`
- Page: `client/src/pages/american-airlines.tsx`
