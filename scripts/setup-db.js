const { Client } = require('pg');

const connectionString = "postgresql://neondb_owner:npg_JmYAWik8F7GU@ep-holy-cherry-b5gx069q-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require";

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  console.log('Connecting to Neon PostgreSQL database...');
  await client.connect();
  console.log('Connected successfully!');

  console.log('Creating tables if they do not exist...');

  await client.query(`
    CREATE TABLE IF NOT EXISTS "Admin" (
      "id" SERIAL PRIMARY KEY,
      "email" TEXT NOT NULL UNIQUE,
      "passwordHash" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "Submission" (
      "id" TEXT PRIMARY KEY,
      "jobTitle" TEXT NOT NULL,
      "companyName" TEXT NOT NULL,
      "applyUrl" TEXT NOT NULL,
      "contactWhatsApp" TEXT,
      "notes" TEXT,
      "status" TEXT NOT NULL,
      "date" TIMESTAMP(3) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "AdminJob" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "company" TEXT NOT NULL,
      "companyLogo" TEXT,
      "location" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "jobType" TEXT NOT NULL,
      "estSalaryPkr" TEXT NOT NULL,
      "url" TEXT NOT NULL,
      "pubDate" TIMESTAMP(3) NOT NULL,
      "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
      "description" TEXT,
      "featured" BOOLEAN NOT NULL DEFAULT true
    );
  `);

  console.log('Tables created successfully!');

  // Verify tables
  const res = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public';
  `);
  console.log('Public tables in Neon DB:', res.rows.map(r => r.table_name));

  await client.end();
}

main().catch(err => {
  console.error('Database setup error:', err);
  process.exit(1);
});
