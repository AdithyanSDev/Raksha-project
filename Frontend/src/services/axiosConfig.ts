// axiosConfig.ts
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Using environment variable for base URL
    headers: {
        'Content-Type': 'application/json',
    },
});
console.log( import.meta.env.VITE_API_BASE_URL)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                console.log(refreshToken)
                if (!refreshToken) throw new Error("No refresh token available");

                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/users/refresh-token`,
                    { refreshToken }
                );

                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

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
