import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Ingresa usuario y contraseña.' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      SELECT id, nombre, rol
      FROM usuarios
      WHERE usuario = ${username}
        AND contrasena = ${password}
      LIMIT 1
    `;

    if (result.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    return res.status(200).json({ success: true, user: result[0] });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error del servidor.' });
  }
}