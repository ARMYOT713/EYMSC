
import { AuthController } from '../controllers/auth.controller.js';

export const LoginView = {

  init() {

    const btn = document.getElementById('loginBtn');
    const errorBox = document.getElementById('error');

    btn.addEventListener('click', () => {

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const result = AuthController.login(username, password);

      if (result.error) {
        errorBox.textContent = result.error;
        return;
      }

      if (result.success) {
        window.location.href = result.role === 'admin'
          ? 'dashboard_admin.html'
          : 'dashboard_cliente.html';
      }

    });

  }

};
