# American Airlines AAdvantage Program

## Point Currencies

American has **two separate currencies**:

| Currency | Purpose | Earns From |
|----------|---------|------------|
| AAdvantage Miles | Redeemable for flights | Flights (with status bonus), cards, partners |
| Loyalty Points (LP) | Elite status qualification | Flights, card spend (flat 1 LP/$) |

**Key distinction**: Loyalty Points are the **only** path to elite status. Miles earned and LP earned are tracked separately. Miles get status bonuses; LP has a flat card rate.

## Tier Qualification (Single Metric)

Status is determined purely by Loyalty Points:

| Tier | LP Required |
|------|------------|
| Gold | 40,000 |
| Platinum | 75,000 |
| Platinum Pro | 125,000 |
| Executive Platinum | 200,000 |
| ConciergeKey | Invitation only (ghost tier) |

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
- **From cards**: 1 LP per dollar on **all** card spending (flight + non-flight), regardless of card tier
- **Annual LP bonus**: Aviator Silver and Citi Executive cards get 10,000 bonus LP

Note: LP does NOT include partner miles or sign-up bonuses.

## Credit Cards

Cards have different multipliers for AA purchases vs general spending:

| Card | Annual Fee | AA Miles | Other Miles | Sign-up |
|------|-----------|----------|-------------|---------|
| Aviator Red | $99 | 2x | 1x | 60K |
| Aviator Silver | $195 | 3x | 2x | 75K (+10K LP annual) |
| Aviator Business | $99 | 2x | 1x | 65K |
| Citi Platinum | $99 | 2x | 1x | 75K |
| Citi Executive | $595 | 4x | 2x | 100K (+10K LP annual) |

Sign-up bonus qualification uses **total** card spend (flight + non-flight).

## Partner Earning

Partner flights earn 5x miles per dollar (flat rate assumption). Partner miles do **not** earn Loyalty Points.

## Value Assumptions

- Mile value: **1.45 cents** per mile
- Total cost for ROI: flight spending + card spending + annual fee + partner spending

## Code Locations

- Schema & configs: `shared/american-schema.ts`
- Calculator logic: `server/american-calculator.ts`
- Components: `client/src/components/american/`
- Page: `client/src/pages/american-airlines.tsx`
