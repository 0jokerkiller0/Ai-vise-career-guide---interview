import { PrismaClient } from "@prisma/client";

// Validate DATABASE_URL before creating PrismaClient
if (!process.env.DATABASE_URL) {
  const errorMessage = `
❌ CRITICAL ERROR: DATABASE_URL is not set!

Please create a .env file in the ai-career-coach directory with:

DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

Example for Neon PostgreSQL:
DATABASE_URL=postgresql://username:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

See SETUP_GUIDE.md for detailed instructions.
  `.trim();
  
  throw new Error(errorMessage);
}

if (!process.env.DATABASE_URL.startsWith("postgresql://") && 
    !process.env.DATABASE_URL.startsWith("postgres://")) {
  const errorMessage = `
❌ INVALID DATABASE_URL FORMAT!

The DATABASE_URL must start with 'postgresql://' or 'postgres://'

Current value starts with: ${process.env.DATABASE_URL.substring(0, 20)}...

Please check your .env file and ensure the DATABASE_URL is correctly formatted.
See SETUP_GUIDE.md for correct format.
  `.trim();
  
  throw new Error(errorMessage);
}

export const db = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
