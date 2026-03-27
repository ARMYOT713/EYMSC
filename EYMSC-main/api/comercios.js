import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const { name, city, owner, plan } = req.body;

    const result = await sql`
      INSERT INTO comercios (nombre, ciudad, responsable, plan)
      VALUES (${name}, ${city}, ${owner}, ${plan})
      RETURNING *
    `;

    return res.status(200).json(result[0]);
  }

  if (req.method === 'GET') {
    const result = await sql`SELECT * FROM comercios`;
    return res.status(200).json(result);
  }

  return res.status(405).json({ error: 'Método no permitido' });
}