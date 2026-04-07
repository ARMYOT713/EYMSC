const pool = require('../db/connection');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { nombre, sku, categoria, unidad, stock, min, precio, comercio_id } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO productos (nombre, sku, categoria, unidad, stock, min, precio, comercio_id, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) 
         RETURNING *`,
        [nombre, sku, categoria, unidad, parseInt(stock), parseInt(min), parseFloat(precio), comercio_id || 1]
      );

      res.status(200).json({ success: true, producto: result.rows[0] });
    } catch (error) {
      console.error('Error guardando producto:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM productos ORDER BY id DESC');
      res.status(200).json({ productos: result.rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};