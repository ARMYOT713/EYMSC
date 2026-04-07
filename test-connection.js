import 'dotenv/config';
import pool from './db/connection.js';

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(' Conexión exitosa a Neon!');
    console.log('Hora del servidor:', result.rows[0].now);
  } catch (error) {
    console.error(' Error de conexión:', error.message);
  } finally {
    await pool.end();
  }
}

testConnection();