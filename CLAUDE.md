# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Vite HMR + Express backend) on port 5000
npm run build        # Build frontend (Vite → dist/public) + backend (esbuild → dist/index.js)
npm run start        # Run production build
npm run check        # TypeScript type checking (no emit)
npm run db:push      # Push Drizzle schema to PostgreSQL
```

No test framework is configured.

## Architecture

Full-stack TypeScript monorepo: React SPA frontend + Express API backend, bundled by Vite (client) and esbuild (server). ESM modules throughout (`"type": "module"`).

### Three-layer structure

- **`client/src/`** — React 18 SPA with Wouter routing, TanStack Query for server state, Tailwind CSS + shadcn/ui (New York style) for UI
- **`server/`** — Express API with Zod-validated POST endpoints, one calculator per airline
- **`shared/`** — Zod schemas and tier/fare/card configuration objects shared between client and server

### Path aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

### Per-airline pattern

Each airline (Southwest, American, United, Delta, JetBlue, Atmos) follows an identical structure:

**Shared schema** (`shared/<airline>-schema.ts`): Tier configs, fare types, credit card configs, Zod input validator.

**Server calculator** (`server/<airline>-calculator.ts`): Stateless function taking validated input, returning points/miles, tier progress, ROI.

**API endpoint** (`server/routes.ts`): `POST /api/calculate` (Southwest) or `POST /api/<airline>/calculate`.

**Client components** (`client/src/components/<airline>/`): Each folder has 5 files — `calculator.tsx`, `tier-card.tsx`, `results-panel.tsx`, `benefits-table.tsx`, `credit-card-table.tsx`.

**Page** (`client/src/pages/<airline>.tsx`): Composes the 5 components with airline-branded styling.

### Key conventions

- Calculators are stateless — no database persistence for calculations, only input/output
- Zod schemas in `shared/` are the single source of truth for validation (used by both server and client)
- Airline brand colors are defined as HSL CSS variables in `client/src/index.css` and referenced in `tailwind.config.ts`
- Theme switching (modern/retro) is managed by `ThemeProvider` in `client/src/hooks/use-theme.tsx`
- API calls use `apiRequest()` from `client/src/lib/queryClient.ts`
- Components use local state (`useState`) — no global state store
- Database (Drizzle ORM + PostgreSQL) is configured but not actively used; storage is in-memory

## Loyalty Program Reference

Each airline's loyalty program has unique rules, point currencies, and qualification logic documented in `docs/`:

- [docs/southwest-program.md](docs/southwest-program.md) — 3 point types (RR, CQP, TQP), OR-logic tier qualification, Companion Pass
- [docs/american-program.md](docs/american-program.md) — Miles + Loyalty Points (separate currencies), single-metric status
- [docs/united-program.md](docs/united-program.md) — Dual-path qualification (PQP-only vs PQP+PQF), most complex status logic
- [docs/delta-program.md](docs/delta-program.md) — MQD-only status, additive miles formula, Basic Economy earns nothing
- [docs/jetblue-program.md](docs/jetblue-program.md) — Tile-based Mosaic qualification, uniform +3 bonus across all Mosaic tiers
- [docs/atmos-program.md](docs/atmos-program.md) — 2026 restructure, status points vs redeemable points, 3 earning methods
