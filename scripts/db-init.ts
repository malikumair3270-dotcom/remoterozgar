import { Client } from 'pg';
import { SEED_GUIDES } from '../src/lib/guides-seed-data';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is missing in environment.');
  process.exit(1);
}

async function initDatabase() {
  console.log('🔗 Connecting to Neon PostgreSQL...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('✅ Connected to Neon database successfully.');

  console.log('🔨 Creating tables & indexes...');
  const ddl = `
    CREATE TABLE IF NOT EXISTS "Guide" (
      "id" TEXT PRIMARY KEY,
      "slug" TEXT UNIQUE NOT NULL,
      "title" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "excerpt" TEXT NOT NULL,
      "body" TEXT NOT NULL,
      "coverImage" TEXT NOT NULL,
      "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "readTimeMinutes" INTEGER NOT NULL,
      "isFeatured" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS "Guide_category_idx" ON "Guide"("category");
    CREATE INDEX IF NOT EXISTS "Guide_publishedDate_idx" ON "Guide"("publishedDate" DESC);

    CREATE TABLE IF NOT EXISTS "Job" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "companyName" TEXT NOT NULL,
      "companyLogo" TEXT,
      "companyWebsite" TEXT,
      "category" TEXT NOT NULL,
      "location" TEXT NOT NULL,
      "jobType" TEXT NOT NULL,
      "salaryMinUsd" INTEGER,
      "salaryMaxUsd" INTEGER,
      "salaryFormatted" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "applyUrl" TEXT NOT NULL,
      "contactEmail" TEXT,
      "isFeatured" BOOLEAN NOT NULL DEFAULT false,
      "status" TEXT NOT NULL DEFAULT 'APPROVED',
      "source" TEXT NOT NULL DEFAULT 'ADMIN',
      "adminNotes" TEXT,
      "pubDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS "Job_status_idx" ON "Job"("status");
    CREATE INDEX IF NOT EXISTS "Job_category_idx" ON "Job"("category");
    CREATE INDEX IF NOT EXISTS "Job_pubDate_idx" ON "Job"("pubDate" DESC);
    CREATE INDEX IF NOT EXISTS "Job_source_idx" ON "Job"("source");

    CREATE TABLE IF NOT EXISTS "JobSnapshot" (
      "id" TEXT PRIMARY KEY,
      "jobCount" INTEGER NOT NULL,
      "jobsJson" JSONB NOT NULL,
      "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS "JobSnapshot_fetchedAt_idx" ON "JobSnapshot"("fetchedAt" DESC);

    CREATE TABLE IF NOT EXISTS "ExchangeRate" (
      "id" TEXT PRIMARY KEY,
      "baseCurrency" TEXT NOT NULL DEFAULT 'USD',
      "targetCurrency" TEXT NOT NULL DEFAULT 'PKR',
      "rate" DOUBLE PRECISION NOT NULL,
      "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS "ExchangeRate_baseCurrency_targetCurrency_fetchedAt_idx" ON "ExchangeRate"("baseCurrency", "targetCurrency", "fetchedAt" DESC);

    CREATE TABLE IF NOT EXISTS "RateLimitAttempt" (
      "id" TEXT PRIMARY KEY,
      "key" TEXT NOT NULL,
      "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS "RateLimitAttempt_key_timestamp_idx" ON "RateLimitAttempt"("key", "timestamp" DESC);
  `;

  await client.query(ddl);
  console.log('✅ All 5 tables and indexes created successfully.');

  // Seed 14 Guides
  console.log(`📚 Seeding ${SEED_GUIDES.length} comprehensive guides...`);
  for (const guide of SEED_GUIDES) {
    const query = `
      INSERT INTO "Guide" ("id", "slug", "title", "category", "excerpt", "body", "coverImage", "readTimeMinutes", "isFeatured", "publishedDate", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      ON CONFLICT ("slug") DO UPDATE SET
        "title" = EXCLUDED."title",
        "category" = EXCLUDED."category",
        "excerpt" = EXCLUDED."excerpt",
        "body" = EXCLUDED."body",
        "coverImage" = EXCLUDED."coverImage",
        "readTimeMinutes" = EXCLUDED."readTimeMinutes",
        "isFeatured" = EXCLUDED."isFeatured",
        "publishedDate" = EXCLUDED."publishedDate",
        "updatedAt" = NOW();
    `;
    await client.query(query, [
      `guide-${guide.slug}`,
      guide.slug,
      guide.title,
      guide.category,
      guide.excerpt,
      guide.body,
      guide.coverImage,
      guide.readTimeMinutes,
      guide.isFeatured,
      new Date(guide.publishedDate),
    ]);
  }
  console.log('✅ 14 comprehensive guides seeded successfully!');

  // Seed initial approved sample jobs
  console.log('💼 Seeding verified approved jobs...');
  const sampleJobs = [
    {
      id: 'rr-job-1',
      title: 'Senior Full-Stack Engineer (Next.js & TypeScript)',
      companyName: 'Superscale Cloud Ltd',
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=200&h=200&q=80',
      companyWebsite: 'https://example.com/superscale',
      category: 'Tech',
      location: 'Anywhere (Global Remote)',
      jobType: 'Full-Time',
      salaryMinUsd: 3500,
      salaryMaxUsd: 5000,
      salaryFormatted: '$3,500 - $5,000 / mo',
      description: 'Senior Full-Stack Engineer leading distributed cloud architectures.',
      applyUrl: 'https://jobicy.com',
      contactEmail: 'careers@example.com',
      isFeatured: true,
      status: 'APPROVED',
      source: 'ADMIN',
      adminNotes: 'Verified direct employer post.',
    },
    {
      id: 'rr-job-2',
      title: 'Senior Product Designer (Design Systems & Web3)',
      companyName: 'Aura Studio Inc',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&h=200&q=80',
      companyWebsite: 'https://example.com/aura',
      category: 'Design',
      location: 'Anywhere (Remote)',
      jobType: 'Full-Time',
      salaryMinUsd: 2800,
      salaryMaxUsd: 4200,
      salaryFormatted: '$2,800 - $4,200 / mo',
      description: 'Senior Product Designer managing Figma design systems.',
      applyUrl: 'https://jobicy.com',
      contactEmail: 'design-hiring@example.com',
      isFeatured: true,
      status: 'APPROVED',
      source: 'ADMIN',
      adminNotes: 'Pre-approved partner posting.',
    },
    {
      id: 'rr-job-3',
      title: 'Technical B2B Copywriter & Content Strategist',
      companyName: 'DevRelix Systems',
      companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&h=200&q=80',
      companyWebsite: 'https://example.com/devrelix',
      category: 'Writing',
      location: 'Worldwide Remote',
      jobType: 'Contract',
      salaryMinUsd: 2000,
      salaryMaxUsd: 3200,
      salaryFormatted: '$2,000 - $3,200 / mo',
      description: 'Technical B2B Copywriter creating developer documentation.',
      applyUrl: 'https://jobicy.com',
      contactEmail: 'content@example.com',
      isFeatured: false,
      status: 'APPROVED',
      source: 'ADMIN',
      adminNotes: 'Direct client submission approved.',
    },
  ];

  for (const job of sampleJobs) {
    const jobQuery = `
      INSERT INTO "Job" ("id", "title", "companyName", "companyLogo", "companyWebsite", "category", "location", "jobType", "salaryMinUsd", "salaryMaxUsd", "salaryFormatted", "description", "applyUrl", "contactEmail", "isFeatured", "status", "source", "adminNotes", "pubDate", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW(), NOW(), NOW())
      ON CONFLICT ("id") DO UPDATE SET
        "title" = EXCLUDED."title",
        "status" = EXCLUDED."status",
        "updatedAt" = NOW();
    `;
    await client.query(jobQuery, [
      job.id,
      job.title,
      job.companyName,
      job.companyLogo,
      job.companyWebsite,
      job.category,
      job.location,
      job.jobType,
      job.salaryMinUsd,
      job.salaryMaxUsd,
      job.salaryFormatted,
      job.description,
      job.applyUrl,
      job.contactEmail,
      job.isFeatured,
      job.status,
      job.source,
      job.adminNotes,
    ]);
  }
  console.log('✅ Approved sample jobs seeded.');

  // Seed USD/PKR ExchangeRate
  console.log('💱 Seeding initial USD/PKR exchange rate cache...');
  await client.query(`
    INSERT INTO "ExchangeRate" ("id", "baseCurrency", "targetCurrency", "rate", "fetchedAt")
    VALUES ($1, 'USD', 'PKR', 278.50, NOW())
    ON CONFLICT DO NOTHING;
  `, ['fx-initial']);
  console.log('✅ Initial exchange rate cached (USD 1 = PKR 278.50).');

  await client.end();
  console.log('\n🎉 ALL DATABASE INITIALIZATION & SEEDING COMPLETED IN NEON!\n');
}

initDatabase().catch((err) => {
  console.error('❌ Database initialization error:', err);
  process.exit(1);
});
