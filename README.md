# plug.

> social commerce, reimagined. real people curate. you shop. they earn.

A full React + Vite web app: **public marketing site** + **authenticated app** with sidebar navigation. Built on the Nook stack (React + Vite + Supabase + Stripe + Firebase + CJ Dropshipping).

---

## Quick start

```bash
cd plug
npm install
cp .env.example .env       # optional — runs with mocks
npm run dev
```

Open `http://localhost:5173`.

---

## Routes

### Public (Marketing site, no login required)
| Route | Page |
|---|---|
| `/` | **Landing** — full marketing page (hero, three sides, shop highlight, earn highlight, drops preview, about, CTA) |
| `/login` | Sign in |
| `/signup` | Create account |

### Authenticated (App with sidebar)
| Route | Page |
|---|---|
| `/feed` | **Feed** — community drops, weekly arena |
| `/shop` | **Shop** ⚡ — flat product browse, buy any item solo |
| `/create` | Create a drop (the builder) |
| `/community` | Top curators + live activity |
| `/leaderboard` | Top drops by category |
| `/dashboard` | Your drops + earnings + activity |
| `/drop/:id` | Drop detail (vote, buy individual products) |
| `/curator/:id` | Curator profile |

Visit any `/feed`, `/shop`, etc. without being logged in → redirected to `/login`.

---

## Auth (mock for now)

Sign up or sign in with anything — auth uses `localStorage` to persist a mock user. Sign out clears it. To wire up real Firebase auth, edit `src/context/AuthContext.jsx` and `src/lib/firebase.js`.

---

## What's clickable

- **Landing page** — every CTA goes to signup / feed
- **Sidebar** — all 6 nav items route between pages, persistent across the app
- **Top bar** — `+ new drop` and XP pill link to create/dashboard
- **Drop cards** — click any → drop detail
- **Vote, share, buy, follow** — all working with toast feedback (stripe checkout stubbed)
- **Shop card buy buttons** — individual product purchase per item
- **Filters, search, sort** — all working
- **Mobile menu** — hamburger opens sidebar on mobile

---

## Project structure

```
plug/
├── src/
│   ├── App.jsx                  # router with public + app split
│   ├── main.jsx
│   ├── styles/index.css         # all CSS (theme tokens at top)
│   │
│   ├── context/
│   │   └── AuthContext.jsx      # mock auth with localStorage
│   │
│   ├── pages/
│   │   ├── Landing.jsx          # marketing site
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── Feed.jsx             # main authenticated landing
│   │   ├── Shop.jsx             # flat product catalog
│   │   ├── Community.jsx        # curators + activity
│   │   ├── Create.jsx           # drop builder
│   │   ├── DropDetail.jsx       # vote + buy products
│   │   ├── Curator.jsx          # profile
│   │   ├── Dashboard.jsx        # your stuff
│   │   ├── Leaderboard.jsx
│   │   └── NotFound.jsx
│   │
│   ├── components/
│   │   ├── MarketingLayout.jsx  # public nav + footer
│   │   ├── AppLayout.jsx        # sidebar + top bar (auth-gated)
│   │   ├── DropCard.jsx         # reusable
│   │   ├── Hero.jsx
│   │   ├── ProgressDots.jsx
│   │   ├── NameSection.jsx
│   │   ├── VibeSection.jsx
│   │   ├── CategorySection.jsx
│   │   ├── ProductPicker.jsx
│   │   ├── DeployBar.jsx
│   │   ├── Toast.jsx
│   │   └── BackgroundDeco.jsx
│   │
│   ├── data/
│   │   ├── categories.js
│   │   ├── vibes.js
│   │   ├── mockProducts.js
│   │   ├── mockCurators.js
│   │   └── mockDrops.js
│   │
│   ├── hooks/
│   │   ├── useDropState.js
│   │   └── useToast.js
│   │
│   └── lib/
│       ├── cjApi.js             # CJ Dropshipping
│       ├── supabase.js          # drops / votes / orders
│       ├── firebase.js          # auth (wire here)
│       └── stripe.js            # individual product checkout
```

---

## Backend hookup (when ready)

### 1. Auth — Firebase
Edit `src/lib/firebase.js` (set env vars) and `src/context/AuthContext.jsx` (swap mock signIn/signUp for `signInWithEmailAndPassword` / `createUserWithEmailAndPassword`).

### 2. Drops — Supabase
SQL schema:
```sql
create table drops (
  id uuid primary key default gen_random_uuid(),
  curator_id uuid not null,
  name text not null,
  pitch text,
  vibes text[] default '{}',
  category text not null,
  product_ids text[] not null,
  week_number int,
  created_at timestamptz default now()
);

create table votes (
  drop_id uuid references drops(id) on delete cascade,
  voter_id uuid not null,
  created_at timestamptz default now(),
  primary key (drop_id, voter_id)
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  drop_id uuid references drops(id),
  product_id text not null,
  buyer_id uuid,
  amount_cents int not null,
  curator_payout_cents int not null,
  stripe_payment_intent text,
  created_at timestamptz default now()
);
```

### 3. Products — CJ Dropshipping
In `src/lib/cjApi.js`: flip `USE_MOCK = false`, point at your Express/Railway backend (reuse Nook's CJ client).

### 4. Checkout — Stripe
In `src/lib/stripe.js`: backend endpoint `POST /api/checkout` body `{ productId, dropId }` returns `{ sessionUrl }`. Use `dropId` for commission attribution.

---

## Design tokens

All colors / shadows / radius live at the top of `src/styles/index.css` under `:root`. Change `--lime` to push the signature color; change `--bg` to flip light/dark.
