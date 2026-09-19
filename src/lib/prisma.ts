// Prisma client singleton — safe require so build doesn't fail before `prisma generate`.
// After running `npx prisma generate`, this always resolves correctly.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('@prisma/client');
  // Singleton pattern: reuse the same client across hot reloads in dev
  if (!(global as any)._prisma) {
    (global as any)._prisma = new PrismaClient({ log: ['error'] });
  }
  prisma = (global as any)._prisma;
} catch {
  // @prisma/client not yet generated – API routes fall back to in-memory store
}

export { prisma };
