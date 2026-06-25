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

- Easiest free setup: one Render web service for both frontend and backend, plus MongoDB Atlas free tier.
- Render will serve the built React app and the API from the same URL, so you do not need a separate frontend host.
- For local development, keep `VITE_API_URL=http://localhost:5000/api`.

### Render setup

1. Create a MongoDB Atlas free cluster and copy the connection string into `server/.env` as `MONGO_URI`.
2. In Render, create a new Web Service from this repo.
3. Set these environment variables in Render:

- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_SETUP_KEY`
- `DEFAULT_ADMIN_EMAIL`
- `DEFAULT_ADMIN_PASSWORD`
- `NODE_ENV=production`

4. Deploy. The service will build the frontend and start the backend.

### Optional separate frontend

If you still want a separate frontend host such as Vercel, set:

- Frontend: `VITE_API_URL=https://your-backend-domain/api`
- Backend: `CLIENT_URL=https://your-frontend-domain`

That path also works, but it needs two live URLs instead of one.
