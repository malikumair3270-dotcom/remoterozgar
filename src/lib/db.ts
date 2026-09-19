import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDbPool(): Pool | null {
  let dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return null;
  }
  dbUrl = dbUrl.trim().replace(/^["']|["']$/g, '');

  if (!pool) {
    pool = new Pool({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client', err);
    });
  }

  return pool;
}
