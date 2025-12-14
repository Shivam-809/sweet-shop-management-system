# Sweet Shop 🍭🍫

A full-stack e-commerce web application for managing and purchasing sweets and chocolates, built with Next.js, TypeScript, and Supabase.

## 📌 Git Repository

[GitHub Repository Link](https://github.com/Shivam-809/sweet-shop-management-system.git)

## 📖 Project Overview

Sweet Shop is a modern e-commerce platform designed for selling sweets and chocolates online. The application features:

- **User Authentication**: Secure registration, login, and password reset functionality using Supabase Auth
- **Product Catalog**: Browse sweets and chocolates with detailed descriptions, pricing, and stock information
- **Admin Panel**: Complete product management system for administrators (CRUD operations)
- **Responsive Design**: Beautiful gradient-based UI with animations, optimized for all screen sizes
- **Database Management**: PostgreSQL database via Supabase with relational data models
- **Type Safety**: Full TypeScript implementation for robust code

### Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS with custom gradients and animations

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager
- Supabase account ([Sign up here](https://supabase.com))

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sweet-shop.git
   cd sweet-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up Supabase**
   - Create a new project in [Supabase Dashboard](https://app.supabase.com)
   - Navigate to Project Settings > API
   - Copy your project URL and anon key

4. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Set up database tables**
   
   Go to your Supabase SQL Editor and run the following:

   ```sql
   -- Create profiles table
   CREATE TABLE profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     email TEXT UNIQUE NOT NULL,
     full_name TEXT,
     role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create sweets table
   CREATE TABLE sweets (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     description TEXT,
     price NUMERIC(10,2) NOT NULL,
     category TEXT NOT NULL CHECK (category IN ('sweet', 'chocolate')),
     image_url TEXT,
     stock INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create purchases table
   CREATE TABLE purchases (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     sweet_id UUID REFERENCES sweets(id) ON DELETE CASCADE,
     quantity INTEGER NOT NULL,
     total_price NUMERIC(10,2) NOT NULL,
     purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Disable RLS (for development simplicity)
   ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
   ALTER TABLE sweets DISABLE ROW LEVEL SECURITY;
   ALTER TABLE purchases DISABLE ROW LEVEL SECURITY;
   ```

6. **Configure Supabase redirect URLs**
   
   In Supabase Dashboard > Authentication > URL Configuration:
   - Add `http://localhost:3000/auth/callback` to redirect URLs
   - Add `http://localhost:3000` to site URL

### Frontend Setup

1. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

2. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The home page will display available products

3. **Create admin account**
   - Navigate to `/admin/setup`
   - Fill in the registration form and submit
   - You'll be redirected to the admin panel

### Running in Production

```bash
npm run build
npm start
```

## 📸 Screenshots

### Login Page 
![Login Page](https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-14-192155-1765720461714.png?width=8000&height=8000&resize=contain)
*Secure user authentication with email/password and Google OAuth*

### User Dashboard
![User Dashboard](https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-14-192206-1765720463049.png?width=8000&height=8000&resize=contain)
*Browse and purchase sweets and chocolates with personalized welcome message*

### Admin Login
![Admin Login](https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-14-192237-1765720462122.png?width=8000&height=8000&resize=contain)
*Dedicated admin authentication portal with role-based access*

### Admin Dashboard
![Admin Dashboard](https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-14-192252-1765720463046.png?width=8000&height=8000&resize=contain)
*Complete product management system with CRUD operations*

## 🤖 My AI Usage

This project was developed with assistance from AI tools to accelerate development and implement best practices:

### AI Tools Used
- **Orchids AI Assistant**: Primary development assistant for code generation, debugging, and architecture decisions
- **Purpose**: Rapid prototyping, implementing authentication flows, database schema design, and UI component creation

### AI-Assisted Features
1. **Authentication System**: Complete Supabase Auth integration including login, registration, password reset, and email verification
2. **Database Schema**: Design and implementation of relational database tables with proper relationships
3. **Admin Panel**: CRUD operations for product management with role-based access control
4. **API Routes**: RESTful API endpoints for products, authentication, and purchases
5. **UI Components**: Responsive design with Tailwind CSS, gradients, and animations
6. **Type Safety**: TypeScript interfaces and type definitions throughout the application

### Human Oversight
- All AI-generated code was reviewed and tested
- Business logic and feature requirements defined by developer
- Database design validated for data integrity and security
- UI/UX decisions made with user experience in mind

### Learning Outcomes
Working with AI assistance helped me:
- Understand Next.js App Router patterns
- Learn Supabase authentication flows
- Implement TypeScript best practices
- Build responsive, modern UI designs

## 🧪 Test Report

### Manual Testing Results

| Feature | Test Case | Status |
|---------|-----------|--------|
| User Registration | Create new account with valid email/password | ✅ Pass |
| User Login | Login with existing credentials | ✅ Pass |
| Password Reset | Request and complete password reset flow | ✅ Pass |
| Admin Access | Access admin panel with admin role | ✅ Pass |
| Product CRUD | Create, read, update, delete products | ✅ Pass |
| Product Display | View products on home page | ✅ Pass |
| Stock Management | Restock products from admin panel | ✅ Pass |
| Authentication Guards | Protect admin routes from regular users | ✅ Pass |

### API Endpoint Tests

```bash
# Test product listing
curl http://localhost:3000/api/sweets

# Test user registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","fullName":"Test User"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Test Coverage
- ✅ Authentication flows working correctly
- ✅ Database operations successful
- ✅ API endpoints returning expected responses
- ✅ Admin role enforcement functional
- ✅ UI responsive across devices

## 🌐 Live Deployment

**Deployed Application**: [https://sweet-shop-management-system-eox2.vercel.app/)

*Deploy your own instance:*
- [Deploy on Vercel](https://vercel.com/new)
- [Deploy on Netlify](https://app.netlify.com)
- Remember to add environment variables in deployment settings
