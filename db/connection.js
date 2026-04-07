import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.postgresql://neondb_owner:npg_Zgwaq2nr6IoA@ep-still-frog-aep2rlkz-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;