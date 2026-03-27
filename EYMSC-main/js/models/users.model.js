
export const UsersModel = {

  users: [
    {
      username: 'Admin',
      password: 'EYMS/09/01/26',
      role: 'admin',
      name: 'Administrador EYMS'
    },
    {
      username: 'Tienda',
      password: '1234',
      role: 'client',
      name: 'Cliente Demo'
    }
  ],

  findUser(username, password) {
    return this.users.find(
      u => u.username.toLowerCase() === username.toLowerCase()
        && u.password === password
    );
  }

};
