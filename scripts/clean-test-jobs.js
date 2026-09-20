require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  const jobs = await client.query('SELECT id, title, url FROM "AdminJob"');
  console.log('Current jobs in AdminJob table:');
  console.log(jobs.rows);

  // Delete test jobs with remoterozgar.com or dummy URLs
  const deleted = await client.query('DELETE FROM "AdminJob" WHERE url LIKE \'%remoterozgar.com%\' OR title LIKE \'%Neon Verified%\'');
  console.log('Deleted dummy test jobs:', deleted.rowCount);

  await client.end();
}

main().catch(console.error);
