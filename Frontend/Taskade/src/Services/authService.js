

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const login = (email, password, rememberMe) => {
  return axios.post(`${API_URL}/auth/login`, {
    email,
    password,
    rememberMe,
  });
};

const logout = () => {
  return axios.post(`${API_URL}/auth/logout`);
};

export default {
  login,
  logout,
};
