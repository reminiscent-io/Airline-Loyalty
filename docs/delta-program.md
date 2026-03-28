# Delta SkyMiles / Medallion Program

> Last verified: March 2026

## Point Currencies

| Currency | Purpose | Earns From |
|----------|---------|------------|
| SkyMiles | Redeemable for flights | Flights, cards |
| MQD (Medallion Qualifying Dollars) | Status qualification | Flights (1:1), card spend, headstart |

## Tier Qualification (Single Metric)

Status is determined purely by MQD. Thresholds are unchanged for 2026:

| Tier | MQD Required |
|------|-------------|
| Silver | 5,000 |
| Gold | 10,000 |
| Platinum | 15,000 |
| Diamond | 28,000 |
| Delta 360 | Invitation only (ghost tier) |

## Miles Earning (Additive Structure)

Delta uses an **additive** formula — base fare rate + loyalty bonus rate:

```
Flight Miles = Spend × (Base Fare Rate + Loyalty Bonus Rate)
```

| Tier | Bonus Rate (added to fare base) |
|------|-------------------------------|
| Member | +0 |
| Silver | +2 |
| Gold | +3 |
| Platinum | +4 |
| Diamond | +6 |

## Fare Classes

Delta updated fare class names. Current structure:

| Fare Class | Base Rate (miles/$) | MQD Earning |
|-----------|---------------------|-------------|
| Main Basic (Basic Economy) | **0** | **0** |
| Comfort Basic | 2 | 1:1 with spend |
| Classic | 5 | 1:1 with spend |
| Refundable | 5 | 1:1 with spend |
| Extra | 7 | 1:1 with spend |

**Critical gotcha**: Main Basic (Basic Economy) earns **0 miles AND 0 MQD** regardless of status. This is the harshest Basic Economy penalty of any airline.

**Note**: MQD is earned on base fare and carrier-imposed surcharges, excluding government taxes and fees. Delta Vacations packages earn 1 MQD per $1 spent on the entire package price (not just the flight portion).

## MQD Earning

- **Flights**: 1:1 with spend (except Main Basic = 0)
- **Card headstart**: Platinum, Platinum Business, Reserve, and Reserve Business cards get $2,500 MQD headstart per card type each qualification year (automatic)
- **Card spend**: Platinum = 1 MQD per $20; Reserve = 1 MQD per $10 (on total card spend including flights)

## Credit Cards

| Card | Annual Fee | MQD Headstart | MQD Earn Rate | SkyMiles Rate | Sign-up |
|------|-----------|--------------|---------------|---------------|---------|
| Gold | $99 | $0 | 0 | ~1.5x average | 75K after $3K |
| Platinum | $350 | $2,500 | 1/$20 | ~1.5x average | 90K after $4K |
| Reserve | $650 | $2,500 | 1/$10 | ~1.5x average | 100K after $6K |

Card SkyMiles earning is simplified to ~1.5x average across all categories.

## Choice Benefits (2026 Updates)

Starting February 1, 2026:
- **Diamond members**: Can gift Gold Medallion Status to **4** family members or friends (up from 2)
- **Platinum members**: Can gift Silver Medallion Status to **4** family members or friends (up from 2)

## Redemption Discount

Cardholders get a **15% discount** on SkyMiles redemptions, effectively making miles worth more. The calculator applies this as: `effective mile value = base value / 0.85`.

## Value Assumptions

- Mile value: **1.1 cents** per mile (non-cardholder), **~1.29 cents** with 15% card discount
- Card SkyMiles: Simplified to 1.5x on all spend

## Code Locations

- Schema & configs: `shared/delta-schema.ts`
- Calculator logic: `server/delta-calculator.ts`
- Components: `client/src/components/delta/`
- Page: `client/src/pages/delta-airlines.tsx`
