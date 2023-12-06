// src/services/api/api.js

import axios from 'axios';

const baseURL = 'https://mobile.digistat.it/CandidateApi';

const api = axios.create({
  baseURL,
  auth: {
    username: 'test',
    password: 'TestMePlease!'
  }
});

export default api;
