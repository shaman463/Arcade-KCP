import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Game Score APIs
export const scoresAPI = {
  saveScore: async (gameName, score, gameData = {}) => {
    try {
      const response = await api.post('/scores', {
        gameName,
        score,
        gameData,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUserScores: async (userId) => {
    try {
      const response = await api.get(`/scores/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getGameLeaderboard: async (gameName) => {
    try {
      const response = await api.get(`/scores/game/${gameName}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAllLeaderboards: async () => {
    try {
      const response = await api.get('/scores');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
