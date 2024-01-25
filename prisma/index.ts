import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// Check if prisma is already defined before creating a new instance
if (process.env.NODE_ENV === "production") {
  prisma = prisma || new PrismaClient();
} else {
  if (typeof window === "undefined") {
    // In development on the server side, recreate PrismaClient for each request
    prisma = new PrismaClient();
  } else {
    // On the client side in development, reuse PrismaClient across HMR updates
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}

export { prisma };
