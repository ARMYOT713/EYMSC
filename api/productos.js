import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const { nombre, stock, precio, comercio_id } = req.body;

    const result = await sql`
      INSERT INTO productos (nombre, stock, precio, comercio_id)
      VALUES (${nombre}, ${stock}, ${precio}, ${comercio_id})
      RETURNING *
    `;

    return res.status(200).json(result[0]);
  }

  if (req.method === 'GET') {
    const result = await sql`SELECT * FROM productos`;
    return res.status(200).json(result);
  }

  return res.status(405).json({ error: 'Método no permitido' });
}