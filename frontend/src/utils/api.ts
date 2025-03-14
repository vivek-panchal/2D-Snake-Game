import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (username: string) => {
  const response = await api.post('/auth/login', { username });
  return response.data;
};

export const registerUser = async (username: string) => {
  const response = await api.post('/auth/register', { username });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// Scores API
export const getScores = async () => {
  const response = await api.get('/scores');
  return response.data;
};

export const getTopScores = async (limit = 10) => {
  const response = await api.get(`/scores/top?limit=${limit}`);
  return response.data;
};

export const getUserScores = async () => {
  const response = await api.get('/scores/user');
  return response.data;
};

export const addScore = async (score: number) => {
  const response = await api.post('/scores', { score });
  return response.data;
};

export default api;