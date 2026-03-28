# JetBlue TrueBlue Program

> Last verified: March 2026

## Point Currencies

| Currency | Purpose | Earns From |
|----------|---------|------------|
| TrueBlue Points | Redeemable for flights | Flights, cards, partners |
| Tiles | Mosaic status qualification | Flight spend ($100 = 1 tile), card spend ($1,000 = 1 tile) |

## Tier Qualification (Tiles Only)

| Tier | Tiles Required |
|------|---------------|
| TrueBlue Member | 0 |
| Mosaic 1 | 50 |
| Mosaic 2 | 100 |
| Mosaic 3 | 150 |
| Mosaic 4 | 250 |

No flight/segment requirement — tiles are the sole qualification metric.

**Status extension**: Starting 2026, Mosaic status and benefits continue through **January 31** of the following year (previously expired December 31). Qualification is still based on spend completed by December 31.

## Points Earning (2026 Change — Tiered Mosaic Bonus)

```
Flight Points = Spend × (Fare Base Rate + Mosaic Bonus) + Card Flight Bonus
```

**Major 2026 change**: Effective February 1, 2026, Mosaic bonus points are **no longer uniform** across all tiers:

| Mosaic Tier | Bonus Points/$ | Total with 6x Fare |
|-------------|---------------|---------------------|
| Member | +0 | 6x |
| Mosaic 1 | +3 | 9x |
| Mosaic 2 | +3 | 9x |
| Mosaic 3 | **+4** | **10x** |
| Mosaic 4 | **+5** | **11x** |

Previously all Mosaic tiers earned +3. Now Mosaic 3 and 4 earn higher bonuses.

## Fare Types

| Fare | Base Points per Dollar |
|------|-----------------------|
| Blue Basic | 2x |
| Blue | 6x |
| Blue Plus | 6x |
| Blue Extra | 6x |
| Mint | 6x |

All fare types earn tiles (including Blue Basic).

## Tile Earning

Two sources with **different ratios**:
- **Flights**: 1 tile per **$100** spent on JetBlue (all eligible fares)
- **Card spending**: 1 tile per **$1,000** spent (only JetBlue Plus and Business cards with `mosaicBoost: true`)

This 10:1 ratio means flight spending is far more efficient for Mosaic qualification.

### Family Tiles (New — February 1, 2026)

Tiles earned by children (ages 12 and under) now count toward the listed adult's Mosaic status and perks. This is the first family tile-sharing program from a U.S. airline.

## Mosaic Benefits Changes (2026)

### Checked Baggage (Change)
- **Mosaic 1**: 1 free checked bag (reduced from 2 in 2025)
- **Mosaic 2, 3, 4**: 2 free checked bags (unchanged)

### Even More Space Seat Upgrades (Change)
- **Mosaic 1 & 2**: Up to 2 complimentary upgrades
- **Mosaic 3 & 4**: Up to 4 complimentary upgrades

### Move to Mint Certificates
- **Mosaic 4**: 4 certificates per year (doubled from 2 in 2025)

## Credit Cards

| Card | Annual Fee | JetBlue Bonus | Other | Mosaic Boost | Sign-up |
|------|-----------|---------------|-------|-------------|---------|
| JetBlue | $0 | 3x | 1x | No | 10K |
| JetBlue Plus | $99 | 6x | 2x | Yes | 80K |
| JetBlue Business | $99 | 6x | 2x | Yes | 80K |

Cards with `mosaicBoost: true` contribute tiles from non-flight card spending.

## Legacy Fields

The `segments` input field exists in the schema but is **not used** for Mosaic qualification. It's kept for backward compatibility (previously JetBlue had a segment requirement). The field is still used for free checked bag value calculation.

## Value Assumptions

- Point value: **1.45 cents** per point
- Checked bag value: $35 per bag
- Partner spending: 2x points per dollar (lower than other airlines' 5x assumption)

## Code Locations

- Schema & configs: `shared/jetblue-schema.ts`
- Calculator logic: `server/jetblue-calculator.ts`
- Components: `client/src/components/jetblue/`
- Page: `client/src/pages/jetblue.tsx`
