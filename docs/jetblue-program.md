# JetBlue TrueBlue Program

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

## Points Earning

```
Flight Points = Spend × (Fare Base Rate + Mosaic Bonus) + Card Flight Bonus
```

**Mosaic bonus is uniform**: All Mosaic tiers (1-4) grant the same +3 points per dollar on flights. There is no incremental point bonus for higher Mosaic levels.

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
