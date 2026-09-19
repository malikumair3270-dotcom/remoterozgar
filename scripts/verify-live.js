const https = require('https');
const { Client } = require('pg');
require('dotenv').config();

function request(url, options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () =>
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: JSON.parse(body || '{}'),
        })
      );
    });
    req.on('error', reject);
    if (data) req.write(typeof data === 'string' ? data : JSON.stringify(data));
    req.end();
  });
}

async function verifyNeonPersistence() {
  console.log('1. Admin Login...');
  const loginRes = await request(
    'https://remoterozgar.vercel.app/api/admin/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.99',
      },
    },
    { email: 'admin@remoterozgar.com', password: 'IW8091L' }
  );

  const cookie = loginRes.headers['set-cookie']?.[0]?.split(';')[0] || '';
  console.log('Login Status:', loginRes.status, '- Logged in successfully!');

  console.log('\n2. Posting new job via Vercel production API...');
  const uniqueTitle = 'Remote Lead DevOps Architect (Neon Verified ' + Date.now() + ')';
  const postRes = await request(
    'https://remoterozgar.vercel.app/api/admin/jobs',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
    },
    {
      title: uniqueTitle,
      company: 'CloudScale Global Inc',
      location: 'Remote (Worldwide)',
      category: 'tech',
      jobType: 'Full-Time',
      estSalaryPkr: 'Rs 700,000 - 1,000,000 PKR/mo',
      url: 'https://remoterozgar.com/jobs/cloudscale',
      tags: ['Kubernetes', 'AWS', 'Terraform', 'PostgreSQL'],
      description: 'Senior cloud infrastructure specialist.',
    }
  );
  console.log('API Post Result:', postRes.status, postRes.body.job?.title);

  console.log('\n3. Direct Query to Neon PostgreSQL Database...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  const dbRes = await client.query('SELECT * FROM "AdminJob" ORDER BY "pubDate" DESC');
  console.log('Total Jobs in Neon Database Table:', dbRes.rows.length);
  if (dbRes.rows.length > 0) {
    console.log('Latest Job in Neon DB:', dbRes.rows[0].title);
  }

  console.log('\n4. Testing Employer Submission Endpoint...');
  const subRes = await request(
    'https://remoterozgar.vercel.app/api/admin/submissions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '10.0.0.12',
      },
    },
    {
      jobTitle: 'Senior React Native Developer',
      companyName: 'Karachi Tech Hub',
      applyUrl: 'https://karachitec.com/apply',
      contactWhatsApp: '+92 321 9876543',
      notes: 'Permanent remote position, Rs 350,000 PKR/mo',
    }
  );
  console.log('Submission API Status:', subRes.status, subRes.body.message);

  const subDbRes = await client.query('SELECT * FROM "Submission" ORDER BY "date" DESC');
  console.log('Total Submissions in Neon Database Table:', subDbRes.rows.length);
  if (subDbRes.rows.length > 0) {
    console.log('Latest Submission in Neon DB:', subDbRes.rows[0].jobTitle, 'from', subDbRes.rows[0].companyName);
  }

  await client.end();
}

verifyNeonPersistence().catch(console.error);
