import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Atualize conforme necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para incluir o token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
