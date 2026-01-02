import axios from 'axios'

const api = axios.create({
    // baseURL: 'https://pharmaclo-bzf8a5d2fmbqhjgk.canadacentral-01.azurewebsites.net/api',
    baseURL: 'https://localhost:7070/api',
    headers: {'Content-Type': 'application/json'},
   
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export default api;