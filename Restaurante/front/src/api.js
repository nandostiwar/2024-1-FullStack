// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/v1' // Cambia la URL base según tu entorno
});

export default api;
