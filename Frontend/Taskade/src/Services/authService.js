/* eslint-disable no-unreachable */




import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const login = (email, password, rememberMe) => {
  return axios.get(`${API_URL}/login`, ()=> console.log("vgvfghjhgjhg"))
  return axios.get(`${API_URL}/login`, {
    email,
    password,
    rememberMe,
   });
};

export default {
  login,
};

