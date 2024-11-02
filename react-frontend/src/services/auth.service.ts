import { AuthApi } from './api';
import TokenService from './token.service';

const AuthService = {
  login: async (email: string, password: string) => {
    const response = await AuthApi
      .post('/auth/login', {
        email,
        password
      });

    if (response.data) {
      TokenService.setUser(response.data);
    }
    return response.data;
  },

  logout: () => {
    TokenService.removeUser();
  },

  register: (name: string, last_name: string, email: string, password: string) => {
    return AuthApi.post('/auth/register', {
      name,
      last_name,
      email,
      password
    });
  },

  getCurrentUser: () => {
    return TokenService.getUser();
  }
};

export default AuthService;