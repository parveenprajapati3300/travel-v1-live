# TripNest (holiday-package-app) — Project Documentation

TripNest is a full-stack travel/holiday-package booking site: a React + Vite frontend for browsing
destinations and packages, and an Express + MongoDB backend that serves package/destination/category
data and handles admin authentication, contact messages, and trip inquiries.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router 7, Bootstrap 5 / React-Bootstrap, Framer Motion, AOS, Swiper |
| Backend | Node.js, Express 5, Mongoose 9 (MongoDB) |
| Auth | JWT (`jsonwebtoken`) + bcrypt password hashing (admin-only) |
| Media | Cloudinary (unsigned client-side uploads for package/destination images) |
| Dev tooling | ESLint, nodemon |
| Deployment | Frontend → Vercel/Netlify, Backend → Render, DB → MongoDB Atlas |

## Project Structure

```
travel-v1-live/
├── src/                     # React frontend (Vite root)
│   ├── pages/                # Route-level views (Home, Destinations, PackageDetails, Login, ...)
│   ├── admin/                 # Admin dashboard (Dashboard, PackageManager, TaxonomyManager, tables)
│   ├── components/            # Shared UI (Navbar, Footer, HeroCarousel, InquiryForm, ProtectedRoute, ...)
│   ├── services/api.js        # Axios client + all backend API calls
│   ├── utils/                 # format.js, slug.js helpers
│   ├── data/packages.js        # Static fallback/sample package data
│   └── App.jsx                # Route definitions
├── server/                   # Express backend
│   ├── server.js               # App entrypoint
│   ├── config/db.js            # Mongoose connection
│   ├── models/                 # Admin, Package, Destination, Category, Contact, Inquiry
│   ├── controllers/            # Route handler logic per resource
│   ├── routes/                 # Express routers per resource
│   ├── middleware/authMiddleware.js  # JWT `protect` middleware
│   └── utils/                  # seedDefaultAdmin, seedCategories, seedPackages, seedDestinationsFromPackages
├── public/                   # Static assets served as-is
├── vite.config.js
├── vercel.json                # SPA rewrite rules (frontend hosting)
├── render.yaml                # Render deployment config (backend hosting)
└── package.json
```

## Prerequisites

- Node.js (18+ recommended)
- A MongoDB instance — local (`mongod`) or MongoDB Atlas

## Environment Variables

### Root `.env` (frontend, read by Vite — variables must be prefixed `VITE_`)

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the backend API, e.g. `http://localhost:5000/api` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image uploads |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |
| `VITE_CLOUDINARY_FOLDER` | Cloudinary folder to upload package/destination images into |

### `server/.env` (backend)

| Variable | Purpose |
|---|---|
| `PORT` | Port the Express server listens on (default `5000`) |
| `MONGO_URI` | MongoDB connection string. Server exits at startup if missing/placeholder |
| `JWT_SECRET` | Secret used to sign admin JWTs |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `ADMIN_SETUP_KEY` | Shared secret required to call `POST /api/auth/seed-admin` |
| `CLIENT_URL` | Allowed CORS origin, e.g. `http://localhost:5173` |
| `DEFAULT_ADMIN_EMAIL` / `DEFAULT_ADMIN_PASSWORD` | Seeds one admin account on server boot if none exists |

Copy from the provided examples: `.env.example` (root) and `server/.env.example`.

## Setup & Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
cp server/.env.example server/.env
# then edit both files with real values (MONGO_URI, JWT_SECRET, ADMIN_SETUP_KEY, ...)

# 3. Start the backend (nodemon, auto-reload)
npm run server

# 4. In a second terminal, start the frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000 (health check at `GET /api/health`)

On backend boot, `seedDefaultAdmin()` creates one admin (`DEFAULT_ADMIN_EMAIL` / `DEFAULT_ADMIN_PASSWORD`)
if the `admins` collection is empty, so you can log in at `/admin-login` immediately.

## npm Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `vite` | Start frontend dev server |
| `npm run server` | `nodemon server/server.js` | Start backend with auto-reload (development) |
| `npm run server:start` | `node server/server.js` | Start backend without nodemon (production) |
| `npm run build` | `vite build` | Build frontend for production |
| `npm run preview` | `vite preview` | Preview the production build locally |
| `npm run lint` | `eslint .` | Lint the codebase |

## Backend API Reference

Base path: `/api`. Routes marked 🔒 require `Authorization: Bearer <token>` (admin JWT).

### Auth (`/api/auth`)
| Method | Path | Description |
|---|---|---|
| POST | `/login` | Log in with `{ email, password }` → `{ token, admin }` |
| POST | `/seed-admin` | Create an admin with `{ email, password, setupKey }`; `setupKey` must match `ADMIN_SETUP_KEY` |

### Packages (`/api/packages`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | — | List packages. Query: `category`, `packageCategory`, `destination`, `includeInactive` |
| GET | `/:id` | — | Get one package by its `id` slug |
| POST | `/` | 🔒 | Create a package |
| PATCH | `/:id` | 🔒 | Update a package |
| DELETE | `/:id` | 🔒 | Delete a package |

### Destinations (`/api/destinations`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | — | List destinations. Query: `type` (`domestic`/`international`), `includeInactive` |
| POST | `/` | 🔒 | Create a destination |
| PATCH | `/:id` | 🔒 | Update a destination |
| DELETE | `/:id` | 🔒 | Delete a destination |

### Categories (`/api/categories`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | — | List categories. Query: `includeInactive` |
| POST | `/` | 🔒 | Create a category |
| PATCH | `/:id` | 🔒 | Update a category |
| DELETE | `/:id` | 🔒 | Delete a category |

### Search (`/api/search`)
| Method | Path | Description |
|---|---|---|
| GET | `/?q=` | Autocomplete suggestions across packages/destinations |

### Contact (`/api/contact`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/` | — | Submit a contact form message |
| GET | `/` | 🔒 | List contact messages (admin) |
| DELETE | `/:id` | 🔒 | Delete a contact message |

### Inquiry (`/api/inquiry`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/` | — | Submit a trip inquiry |
| GET | `/` | 🔒 | List inquiries (admin) |
| PATCH | `/:id/contacted` | 🔒 | Mark an inquiry as `Contacted` |
| DELETE | `/:id` | 🔒 | Delete an inquiry |

## Data Models

- **Admin** — `email`, bcrypt-hashed `password`. `matchPassword()` compares candidate passwords.
- **Package** — `id` (unique slug), `category` (`domestic`/`international`), `packageCategories[]`,
  `packageDestination`, `title`, `image`, `duration`, `price`, `location`, `rating`, `description`,
  `highlights[]`, `included[]`, `excluded[]`, `itinerary[{day, title, details}]`, `hotel`, `transport`,
  `gallery[]`, `reviews[]`, `isActive`.
- **Destination** — `name` (unique), `type` (`domestic`/`international`), `image`, `price`, `isActive`.
- **Category** — `name` (unique), `image`, `isActive`.
- **Contact** — `name`, `email`, `phone`, `subject`, `message`.
- **Inquiry** — `name`, `email`, `phone`, `destination`, `travelDate`, `people`, `budget`, `message`,
  `status` (`New`/`Contacted`).

## Frontend Overview

- **Routing** (`src/App.jsx`): public pages (`/`, `/about`, `/destinations`, `/destination/:slug`,
  `/categories`, `/category/:slug`, `/domestic`, `/international`, `/group-trips`,
  `/weekend-getaways`, `/customized-tours`, `/community`, `/blogs`, `/package/:id`, `/contact`,
  `/inquiry`) plus admin routes (`/admin-login`, `/admin/:section` guarded by `ProtectedRoute`).
- **Admin dashboard** (`src/admin/`): `Dashboard.jsx` hosts tabs/sections for `PackageManager`
  (CRUD for packages), `TaxonomyManager` (categories & destinations), `ContactTable`, and
  `InquiryTable`, with `AdminPagination` for list paging.
- **API layer** (`src/services/api.js`): single Axios instance (`baseURL` = `VITE_API_URL`) with a
  request interceptor that attaches the admin JWT from `localStorage` key `tripnest_admin_token` to
  every request. All backend calls are exported as named functions from this file.
- **Auth guard** (`src/components/ProtectedRoute.jsx`): redirects to `/admin-login` if no valid
  token is present.

## Admin Login Flow

1. Visit `/admin-login`.
2. Submit credentials → `POST /api/auth/login`.
3. On success, the JWT is stored in `localStorage` (`tripnest_admin_token`) and the app redirects to
   `/admin/dashboard`.
4. Every subsequent admin API call automatically sends `Authorization: Bearer <token>` via the
   Axios interceptor.
5. To provision additional admins, call `POST /api/auth/seed-admin` with the `ADMIN_SETUP_KEY`.

## Deployment

- **Frontend**: Deploy to Vercel or Netlify. `vercel.json` rewrites all paths to `index.html` for
  client-side routing (SPA). Set `VITE_API_URL` to the deployed backend URL, and the Cloudinary
  `VITE_*` vars.
- **Backend**: Deploy to Render using `render.yaml` (`npm install` build, `npm run server:start`
  start command). Set `MONGO_URI` to an Atlas connection string, plus `JWT_SECRET`,
  `ADMIN_SETUP_KEY`, and `CLIENT_URL` (pointing at the deployed frontend origin for CORS).
- **Database**: MongoDB Atlas free tier is sufficient for small workloads.

## Notes / Known Quirks

- `devDependencies` previously pinned `@rolldown/binding-win32-x64-msvc`, a Windows-only native
  binding, which breaks `npm install` on macOS/Linux. It has been removed — if it reappears via a
  lockfile merge, drop it again.
- `server/config/db.js` treats any `MONGO_URI` containing angle brackets (e.g. an unfilled
  `<db_password>` placeholder) as invalid and exits the process — replace placeholders fully before
  starting the server.
