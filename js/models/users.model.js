import pool from '../db/connection.js';

export const createUser = async (user) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [user.email, user.password]
  );
  return result.rows[0];
};