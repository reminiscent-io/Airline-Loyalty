# United Airlines MileagePlus Program

> Last verified: March 2026

## Point Currencies

United has **three qualification metrics**:

| Currency | Purpose | Earns From |
|----------|---------|------------|
| Miles | Redeemable for flights | Flights (status + card multiplier), cards, partners |
| PQP (Premier Qualifying Points) | Status qualification | Flights (1:1 with spend), cards (with caps), partners |
| PQF (Premier Qualifying Flights) | Status qualification (alternative path) | Qualifying flights only (not Basic Economy) |

## Tier Qualification (Dual-Path — AND Logic)

United uses the most complex qualification system. There are **two paths**, and both require a **minimum of 4 United-operated segments**:

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

### PQP Starter Deposit (Returning Elites)

Members who earned status in the prior year receive a PQP head start (deposited by February 1):
- Silver: 300 PQP
- Gold: 600 PQP
- Platinum: 900 PQP
- 1K: 1,400 PQP

## Miles Earning (Major Change — Effective April 2, 2026)

United is overhauling miles earning rates on April 2, 2026. The new system differentiates between cardholders and non-cardholders:

### New Miles Per Dollar (April 2, 2026+)

| Tier | No Card | With United Card |
|------|---------|-----------------|
| Member | 3x | 6x |
| Silver | 5x | 8x |
| Gold | 6x | 9x |
| Platinum | 7x | 10x |
| 1K | 9x | 12x |

**Key changes from pre-April 2026 rates**:
- Non-cardholders lose 2 miles per dollar across all tiers (was 5x base → now 3x base)
- Cardholders gain 1 mile per dollar vs old rates
- Premium card "pay with card" rates can be even higher (up to 17x for 1K with Club Card)

### Basic Economy Miles Change

**Critical**: As of April 2, 2026, general members without an eligible United card earn **0 miles** on Basic Economy fares. Cardholders and Premier members earn at a reduced rate.

### Pre-April 2026 Rates (Legacy)

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

## Credit Cards (PQP Earning) — Updated 2026

| Card | Annual Fee | PQP Rate | PQP Cap | Annual PQP Bonus | Sign-up PQP |
|------|-----------|----------|---------|-------------------|-------------|
| Gateway | $0 | 0 | 0 | 0 | 0 |
| Explorer | $95 | 1/$20 | 1,000 | 0 | 0 |
| Quest | $350 | 1/$20 | 18,000 | 1,000 | 1,000 |
| Club | $650 | 1/$15 | 28,000 | 1,500 | 2,000 |
| Club Business | $650 | 1/$15 | 28,000 | 1,500 | 2,000 |
| Business | $99 | 1/$20 | 4,000 | 0 | 0 |

Card PQP is earned on **total** card spend (flight + non-flight combined), then capped.

**2026 change**: PQP earned through eligible United card spending now counts toward earning additional PlusPoints for 1K members.

## Other 2026 Updates

- **Award ticket upgrades**: Starting February 1, 2026, all Premier members are eligible for PlusPoints and complimentary Premier upgrades on award tickets
- **Dynamic PlusPoints pricing**: Starting February 2027, PlusPoints required for upgrades will use dynamic pricing based on demand and cabin (no longer fixed amounts)

## Value Assumptions

- Mile value: **1.22 cents** per mile
- Partner flights: 5x miles per dollar
- Partner PQP: Simplified to equal partner spending

## Code Locations

- Schema & configs: `shared/united-schema.ts`
- Calculator logic: `server/united-calculator.ts`
- Components: `client/src/components/united/`
- Page: `client/src/pages/united-airlines.tsx`
