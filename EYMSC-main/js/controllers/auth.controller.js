export const AuthController = {

  async login(username, password) {
    if (!username || !password) {
      return { error: 'Ingresa usuario y contraseña.' };
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Error al iniciar sesión.' };
    }

    sessionStorage.setItem('sc_user', JSON.stringify(data.user));
    return { success: true, role: data.user.rol };
  }

};