# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## America's Rant Line — Backend

Full backend for a political talk-radio voicemail platform with three lines:
- 🔴 MAGA Line (Conservative/Republican)
- 🔵 Blue Line (Democrat/Progressive)
- ⚪ Neutral Line (Independent)

### Environment Variables Required

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Auto-provided by Replit PostgreSQL |
| `ADMIN_API_KEY` | Secret key for admin endpoints (set via environment secrets) |
| `TWILIO_ACCOUNT_SID` | Twilio account (optional — for live call intake) |
| `TWILIO_AUTH_TOKEN` | Twilio auth (optional) |
| `TWILIO_PHONE_NUMBER` | Twilio phone number (optional) |
| `STRIPE_SECRET_KEY` | Stripe secret key (optional — for payments) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (optional) |

### Database Tables

- **callers**: id, phone, email, nickname, city, state, created_at
- **rants**: id, rant_number (serial), caller_id, category, title, topic, audio_url, duration, votes, downvotes, plays, approved, featured, created_at
- **call_codes**: id, code (unique), caller_id, plan, category, stripe_session_id, used, rant_id, created_at, expires_at
- **activity_log**: id, type, message, metadata (jsonb), created_at

### API Routes

**Public Rants**
| Method | Path | Description |
|---|---|---|
| GET | `/api/rants/latest` | Paginated rants (?page, ?limit, ?sort, ?category, ?topic, ?q) |
| GET | `/api/rants/trending` | Trending rants (last 48h by votes) |
| GET | `/api/rants/featured` | Current featured rant |
| GET | `/api/rants/by-line` | Latest 10 rants per line (maga/blue/neutral) |
| GET | `/api/rants/top-by-line` | Top rant per line by votes |
| GET | `/api/rants/leaderboard` | Top rants (?period=today/week/month/all, ?limit) |
| GET | `/api/rants/:id` | Single rant |
| POST | `/api/rants/:id/vote` | Upvote (rate-limited: 5/min) |
| POST | `/api/rants/:id/downvote` | Downvote (rate-limited: 5/min) |
| POST | `/api/rants/:id/play` | Increment play count |

**Stats & Aggregation**
| Method | Path | Description |
|---|---|---|
| GET | `/api/stats/calls` | Total call counts by line |
| GET | `/api/stats/calls/today` | Today's call counts |
| GET | `/api/stats/global` | Global totals (rants, plays, votes, callers, featured) |
| GET | `/api/stats/topics` | Trending topics with counts |
| GET | `/api/stats/top-ranters` | Top callers by votes (?limit) |
| GET | `/api/stats/category-breakdown` | Topic distribution with percentages |

**Call Codes**
| Method | Path | Description |
|---|---|---|
| POST | `/api/call-codes/generate` | Generate code (body: plan, category) |
| GET | `/api/call-codes/:code` | Lookup code validity |
| POST | `/api/call-codes/:code/use` | Mark code as used |

**Twilio Webhooks**
| Method | Path | Description |
|---|---|---|
| POST | `/api/twilio/voice` | IVR entry point with legal notice |
| POST | `/api/twilio/gather` | Keypress handler (1=MAGA, 2=Blue, 3=Neutral) |
| POST | `/api/twilio/code-check` | Validate call code during call |
| POST | `/api/twilio/record` | Start recording with plan-based max length |
| POST | `/api/twilio/recording` | Recording complete webhook → save to DB |

**Payments**
| Method | Path | Description |
|---|---|---|
| POST | `/api/payments/create-session` | Stripe checkout (body: product, category) |
| POST | `/api/payments/webhook` | Stripe webhook → creates call code + logs activity |

**Admin (requires x-admin-key header)**
| Method | Path | Description |
|---|---|---|
| GET | `/api/admin/rants/pending` | Pending moderation queue |
| GET | `/api/admin/rants` | All rants (last 100) |
| POST | `/api/admin/rants/:id/approve` | Approve rant |
| POST | `/api/admin/rants/:id/reject` | Delete rant |
| POST | `/api/admin/rants/:id/feature` | Feature + approve rant |
| POST | `/api/admin/rants/:id/unfeature` | Remove from featured (keep approved) |
| POST | `/api/admin/rants/:id/category` | Update topic/category |
| POST | `/api/admin/rants/:id/title` | Set rant title |
| POST | `/api/admin/rants/bulk-approve` | Approve all pending |
| GET | `/api/admin/callers` | All callers list |
| GET | `/api/admin/stats/revenue` | Revenue analytics (?period=week/month/year) |
| GET | `/api/admin/activity` | Activity log feed (?limit) |

### Stripe Products

| Key | Name | Price |
|---|---|---|
| `leave-rant` | Leave a Rant | $2.99 |
| `skip-line` | Skip the Line | $12.99 |
| `featured` | Featured Rant | $39.99 |

## America's Rant Line — Frontend

React + Vite SPA at `artifacts/rant-line/` with wouter routing and TanStack React Query.

### Pages
| Route | Component | Description |
|---|---|---|
| `/` | Home | Hero, stats, 3 line counters, featured rant, trending list, CTA |
| `/rants` | RantsFeed | Paginated/filtered/searchable rant feed with audio playback |
| `/leaderboard` | Leaderboard | Period-selectable top rants + top ranters sidebar |
| `/leave-a-rant` | LeaveARant | Line picker, plan selector, Stripe checkout flow |
| `/arena` | RedVsBlue | Red vs Blue comparison: bar, top rant VS, latest per side |
| `/admin` | AdminDashboard | API key auth, moderation queue, stats panel |

### Key Files
- `src/lib/api.ts` — typed fetch client for all API endpoints
- `src/components/Layout.tsx` — shared nav + footer (mobile hamburger)
- `src/components/RantCard.tsx` — reusable rant card with play/vote/downvote
- `src/index.css` — dark navy theme (bg `#0a0e1a`, primary `#cc0000`)
- `vite.config.ts` — proxies `/api` to API server on port 8080

### Design
- Always dark mode (navy `#0a0e1a` background)
- Red `#cc0000` primary, blue `#1e40af` for blue line
- Font: Inter (font-black for headings)
- Wordmark: `America's` (bold) `Rant Line` (light)

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
