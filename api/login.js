import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

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
      SELECT id, nombre, rol, password_hash
      FROM usuarios
      WHERE username = ${username}
      LIMIT 1
    `;

    if (result.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado.' });
    }

    const user = result[0];

    
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error del servidor.' });
  }
}