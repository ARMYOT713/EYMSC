import pool from '../db/connection.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { nombre, sku, categoria, unidad, stock, stock_min, precio, comercio_id } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO productos (nombre, sku, categoria, unidad, stock, stock_min, precio, comercio_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [nombre, sku, categoria, unidad, parseInt(stock), parseInt(stock_min), parseFloat(precio), comercio_id || 1]
      );
      return res.status(200).json({ success: true, producto: result.rows[0] });
    } catch (error) {
      console.error('Error guardando producto:', error);
      return res.status(500).json({ error: error.message });
    }

  } else if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM productos ORDER BY id DESC');
      return res.status(200).json({ productos: result.rows });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}