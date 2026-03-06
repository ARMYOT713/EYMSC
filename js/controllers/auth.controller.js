
import { UsersModel } from '../models/users.model.js';

export const AuthController = {

  login(username, password) {

    if (!username || !password) {
      return { error: "Ingresa usuario y contraseña." };
    }

    const user = UsersModel.findUser(username, password);

    if (!user) {
      return { error: "Credenciales incorrectas." };
    }

    sessionStorage.setItem('sc_user', JSON.stringify(user));

    return { success: true, role: user.role };

  }

};
