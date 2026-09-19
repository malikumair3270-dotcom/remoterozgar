const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  console.log('Connected to Neon.');

  // Test insert
  const id = 'test-job-' + Date.now();
  await client.query(
    'INSERT INTO "AdminJob" ("id", "title", "company", "companyLogo", "location", "category", "jobType", "estSalaryPkr", "url", "pubDate", "tags", "description", "featured") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
    [
      id,
      'Test Job',
      'Test Co',
      '',
      'Remote',
      'tech',
      'Full-Time',
      '100k PKR',
      'https://example.com',
      new Date(),
      ['react', 'node'],
      'job description',
      true
    ]
  );
  console.log('INSERT AdminJob SUCCESSFUL!');

  const jobs = await client.query('SELECT * FROM "AdminJob"');
  console.log('JOBS COUNT NOW:', jobs.rows.length);

  // Clean up test job
  await client.query('DELETE FROM "AdminJob" WHERE "id" = $1', [id]);
  console.log('CLEANUP SUCCESSFUL!');

  await client.end();
}

run().catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});
