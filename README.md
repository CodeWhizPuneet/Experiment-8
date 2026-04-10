# Experiment 8 Fresh Setup

A fresh fullstack architecture with:

- Frontend: React 18 + React Router 6 + Axios
- Backend: Express 4 + JWT + RBAC + MongoDB (Mongoose 7)

## Project structure

- `frontend/` - React UI and route guards
- `backend/` - Auth API, JWT verification, RBAC middleware

## Local setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start
```

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Default demo users

- Admin: admin@college.edu / Admin@123
- Student: student@college.edu / Student@123

## Deploy

### Frontend (Vercel)

- Root directory: `frontend`
- Env: `VITE_API_BASE_URL=https://<your-backend-domain>/api`

### Backend (Render)

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm run start`
- Env vars:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `CLIENT_ORIGIN=https://<your-frontend-domain>`

## API quick check

- Health: `GET /api/health`
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Me: `GET /api/auth/me`
- Dashboard: `GET /api/user/dashboard`
- Admin users: `GET /api/user/admin/users`
