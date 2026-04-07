import pool from '../db/connection.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { nombre, usuario, contrasena, rol, comercio_id } = req.body;

    if (!nombre || !usuario || !contrasena || !rol) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO usuarios (nombre, usuario, contrasena, rol, comercio_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, nombre, usuario, rol`,
        [nombre, usuario, contrasena, rol, comercio_id || 1]
      );
      return res.status(200).json({ success: true, usuario: result.rows[0] });
    } catch (error) {
      console.error('Error creando usuario:', error);
      return res.status(500).json({ error: error.message });
    }

  } else if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT id, nombre, usuario, rol, comercio_id FROM usuarios ORDER BY id DESC');
      return res.status(200).json({ usuarios: result.rows });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}