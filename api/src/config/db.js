const { Pool } = require('pg');
require('dotenv').config();

let poolConfig;

if (process.env.DATABASE_URL) {
  // Use connection string (e.g. Supabase)
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  };
} else {
  // Use individual env vars (local dev)
  poolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

const pool = new Pool(poolConfig);

pool.on('connect', () => console.log('✅ Connected to Postgres'));
pool.on('error', (err) => console.error('❌ Postgres pool error:', err.message));

module.exports = pool;
