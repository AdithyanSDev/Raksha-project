import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to inject tokens (refresh token handling can also be added here)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor for handling token expiry or refresh token flow
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error("No refresh token available");
  
          const { data } = await axios.post(
            'http://localhost:5000/api/users/refresh-token',
            { refreshToken }
          );
  
          // Update tokens
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
  
          // Update the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default api;
