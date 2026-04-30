# Marvel API

A Marvel character search app built as a pure frontend that talks directly to a self-hosted Supabase instance. Users sign in, search by name with autocomplete, and view character details. Designed to deploy as a static site on Cloudflare Pages — no backend server required.

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES modules), HTML, CSS
- **Bundler / dev server:** Vite
- **Backend-as-a-service:** Supabase (auth + Postgres) — self-hosted
- **Auth:** Supabase Auth (email/password, password reset)

## Project Structure

```
.
├── index.html              # Main app (search + autocomplete)
├── login.html              # Login page
├── register.html           # Registration page
├── reset-password.html     # Password reset flow
├── src/
│   ├── script.js           # Main app logic
│   ├── supabase.js         # Supabase client + auth + query helpers
│   ├── login.js            # Login page logic
│   ├── register.js         # Register page logic
│   └── reset-password.js   # Reset password logic
├── public/
│   └── style.css           # Shared styles
├── supabase-rls.sql        # Row Level Security policies for the characters table
├── vite.config.js
└── package.json
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=https://your-supabase-instance.example.com
VITE_SUPABASE_ANON_KEY=your-anon-jwt
```

These are read by `src/supabase.js` at build time and exposed to the browser bundle.

### 3. Set up the database

In your Supabase project, create a `characters` table with these columns:

| Column          | Type    | Notes                  |
| --------------- | ------- | ---------------------- |
| `id`            | int8    | primary key (identity) |
| `marvel_id`     | int8    | unique                 |
| `name`          | text    | indexed for search     |
| `description`   | text    | nullable               |
| `thumbnail_url` | text    |                        |

Then apply Row Level Security from `supabase-rls.sql` (run it in the Supabase SQL editor). The default policy allows authenticated users to read; switch to the public policy in that file if you want anonymous reads.

### 4. Run locally

```bash
npm run dev
```

Vite serves the app at <http://localhost:3000>.

## Scripts

| Script            | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production bundle locally |

## Deployment (Cloudflare Pages)

1. Connect the repository to Cloudflare Pages.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Add the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Pages project settings.

The app is fully static after build — there is no server-side runtime.

## Authentication Flow

- Visitors land on `index.html` and are gated by `auth-gate` until a Supabase session is detected.
- Sign-in / sign-up / password-reset are handled on dedicated pages via Supabase Auth.
- Once authenticated, the Supabase JS client uses the session JWT automatically when querying the `characters` table; RLS policies enforce who can read what.

## Notes

- The anon key is safe to expose in the browser bundle — it is the public client-side key. Privileged operations should be guarded by RLS policies on the database.
- `node_modules/` and `dist/` are gitignored.
