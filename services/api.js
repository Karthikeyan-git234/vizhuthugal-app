import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vizhuthugal-backend-3jmj.onrender.com/api',
});

export default API;