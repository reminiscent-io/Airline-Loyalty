# United Airlines MileagePlus Program

## Point Currencies

United has **three qualification metrics**:

| Currency | Purpose | Earns From |
|----------|---------|------------|
| Miles | Redeemable for flights | Flights (status multiplier), cards, partners |
| PQP (Premier Qualifying Points) | Status qualification | Flights (1:1 with spend), cards (with caps), partners |
| PQF (Premier Qualifying Flights) | Status qualification (alternative path) | Qualifying flights only (not Basic Economy) |

## Tier Qualification (Dual-Path — AND Logic)

United uses the most complex qualification system. There are **two paths**, and both require a **minimum of 4 United flights**:

### Path 1: PQP-Only (requires 4+ PQF minimum)

| Tier | PQP Required |
|------|-------------|
| Silver | 6,000 |
| Gold | 12,000 |
| Platinum | 18,000 |
| 1K | 28,000 |

### Path 2: Alternative (Lower PQP + Higher PQF)

| Tier | PQP Required | PQF Required |
|------|-------------|-------------|
| Silver | 5,000 | 15 |
| Gold | 10,000 | 30 |
| Platinum | 15,000 | 45 |
| 1K | 22,000 | 60 |

**Gotcha**: Unlike Southwest (OR logic), United requires you to satisfy the **complete** path — you can't mix PQP from one path with PQF from another. If you have enough PQP but not enough PQF, you're blocked (the calculator tracks this as `blockingRequirement`).

Ghost tier: **Global Services** is invitation-only.

## Miles Earning

Miles use a flat tier multiplier (not base + bonus):

| Tier | Miles per Dollar |
|------|-----------------|
| Member | 5x |
| Silver | 7x |
| Gold | 8x |
| Platinum | 9x |
| 1K | 11x |

## PQP Earning

- **Flights**: 1 PQP per $1 spent on all fare types (including Basic Economy)
- **Credit cards**: Varies by card — 1 PQP per $15-$20 spent, with annual caps
- **Card annual PQP bonus**: Quest gets 1,000; Club/Club Business get 1,500
- **Sign-up PQP bonus**: Quest gets 1,000; Club/Club Business get 2,000

## PQF Gotcha

**Basic Economy earns 0 PQF.** All other fare classes earn PQF. This is critical — a frequent Basic Economy flyer may accumulate high PQP but zero PQF, blocking tier qualification.

## Credit Cards (PQP Earning)

| Card | Annual Fee | PQP Rate | PQP Cap | Annual PQP Bonus | Sign-up PQP |
|------|-----------|----------|---------|-------------------|-------------|
| Gateway | $0 | 0 | 0 | 0 | 0 |
| Explorer | $95 | 1/$20 | 1,000 | 0 | 0 |
| Quest | $350 | 1/$20 | 18,000 | 1,000 | 1,000 |
| Club | $650 | 1/$15 | No cap | 1,500 | 2,000 |
| Club Business | $650 | 1/$15 | No cap | 1,500 | 2,000 |
| Business | $99 | 1/$20 | 3,000 | 0 | 0 |

Card PQP is earned on **total** card spend (flight + non-flight combined), then capped.

## Value Assumptions

- Mile value: **1.22 cents** per mile
- Partner flights: 5x miles per dollar
- Partner PQP: Simplified to equal partner spending

## Code Locations

- Schema & configs: `shared/united-schema.ts`
- Calculator logic: `server/united-calculator.ts`
- Components: `client/src/components/united/`
- Page: `client/src/pages/united-airlines.tsx`
