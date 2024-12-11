// src/services/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4091/register', // כתובת ה-API שלך
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
