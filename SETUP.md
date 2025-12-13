# Sweet Shop - Setup & Run Guide

## 🚀 Quick Start

### Run the Development Server

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 🔐 Admin Access

**Admin Credentials:**
- **Email**: `admin@sweetshop.com`
- **Password**: Create this account manually (see below)

### Create Admin Account:

1. Visit `/register` and sign up with email `admin@sweetshop.com`
2. Or go to Supabase Dashboard → Authentication → Users → Create User
3. After creation, go to Database → `profiles` table
4. Find the user and change their `role` from `user` to `admin`

Access admin panel at `/admin` after logging in with admin credentials.

---

## 🔧 Google OAuth Setup

### 1. Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted
6. Select **Web application**
7. Add authorized origins:
   - `http://localhost:3000` (development)
   - Your production domain
8. Add authorized redirect URIs:
   - `https://tqxumogehotaprealnmi.supabase.co/auth/v1/callback`
9. Copy **Client ID** and **Client Secret**

### 2. Configure Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **orchids-sapphire-crystal**
3. Navigate to **Authentication** → **Providers** → **Google**
4. Enable Google provider
5. Paste your **Client ID** and **Client Secret**
6. Save changes

### 3. Add Redirect URLs in Supabase

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add these redirect URLs:
   - `http://localhost:3000/**` (development)
   - Your production domain with `/**` wildcard

---

## 📦 Tech Stack

- **Framework**: Next.js 15.5.7 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email + Google OAuth)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript

---

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/           # Admin panel
│   ├── auth/callback/   # OAuth callback handler
│   ├── dashboard/       # User dashboard
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   └── api/
│       ├── auth/       # Auth API routes
│       └── sweets/     # Sweets CRUD API
├── components/ui/      # Reusable UI components
└── lib/
    ├── supabase/       # Supabase client/server
    └── actions/        # Server actions
```

---

## 🗄️ Database Schema

### Tables:
- **profiles**: User profiles (linked to Supabase auth.users)
- **sweets**: Product catalog
- **purchases**: Purchase history

---

## 🎯 Features

- ✅ Email/Password authentication
- ✅ Google OAuth authentication
- ✅ User dashboard with sweet shop
- ✅ Admin panel for inventory management
- ✅ Purchase tracking
- ✅ Role-based access control

---

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🔒 Environment Variables

Already configured in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📝 Notes

- Default users have `user` role
- Admin access requires manual role change in database
- Google OAuth requires setup in both Google Cloud Console and Supabase Dashboard
- Protected routes: `/dashboard`, `/admin`
- Redirect URLs must match exactly in both Google and Supabase configs
