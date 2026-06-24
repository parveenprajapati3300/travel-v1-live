# travel-v1

TripNest is a React + Vite frontend with an Express + MongoDB backend.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create `server/.env` from `server/.env.example` and set:

- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_SETUP_KEY`
- `CLIENT_URL`

3. Start the backend:

```bash
npm run server
```

4. Start the frontend in another terminal:

```bash
npm run dev
```

## Free deployment

- Frontend: Vercel or Netlify
- Backend: Render
- Database: MongoDB Atlas free tier

Use `VITE_API_URL` on the frontend and `CLIENT_URL` on the backend to point both sides at the live URLs.
