This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Setup

To create an admin account and access the admin panel:

1. Navigate to `/admin/setup` in your browser
2. Fill in the admin registration form:
   - Full Name
   - Email
   - Password (minimum 6 characters)
3. Click "Create Admin Account" "already created so use /admin directly "
4. You will be automatically logged in and redirected to the admin panel at `/admin`
use credentials :- 
malhotrashivam809@gmail.com
@Fghj5678



### Admin Features

Once logged in as an admin, you can:
- View and manage all products (sweets and chocolates)
- Add new products to the inventory
- Edit existing product details (name, description, price, stock, category)
- Delete products
- Restock items

### Admin Login

After creating your admin account, you can login at `/login` using your admin credentials. The system will automatically redirect you to the admin panel if you have admin role.

### Setting Admin Role Manually (Database)

If you need to manually set a user as admin in the database:

1. Access your Supabase dashboard
2. Go to the Table Editor and select the `profiles` table
3. Find the user's profile by email
4. Update the `role` column to `admin`
5. The user can now access the admin panel at `/admin`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
