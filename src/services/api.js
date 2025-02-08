// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Make sure this matches your Flask backend URL
});

export default api;
