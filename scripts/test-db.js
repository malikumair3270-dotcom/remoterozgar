const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect().then(async () => {
  const subs = await client.query('SELECT * FROM "Submission"');
  console.log('SUBS COUNT:', subs.rows.length);
  const jobs = await client.query('SELECT * FROM "AdminJob"');
  console.log('JOBS COUNT:', jobs.rows.length);
  await client.end();
  console.log('TEST DB PASSED!');
}).catch(err => {
  console.error('TEST DB ERROR:', err);
  process.exit(1);
});
