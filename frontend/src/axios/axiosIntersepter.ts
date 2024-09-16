import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  apiClient.interceptors.request.use(
    (config) => {
      // Get the token from localStorage
      const token = localStorage.getItem('token'); // Replace 'token' with the key where you store your token
  
      if (token) {
        // If token exists, set the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default apiClient;