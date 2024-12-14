// authService.ts
import api from './axiosConfig';
import { toast } from 'react-toastify';

export const loginUser = async (email: string, password: string, latitude: number, longitude: number) => {
    try {
        const response = await api.post('/api/users/login', { email, password, latitude, longitude });

        const { token, refreshToken, user } = response.data;
        if (!token || !refreshToken || !user?.role) {
            throw new Error("No token, refresh token, or role received in response");
        }

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
    } catch (error: any) {
        console.error('Login API error:', error);
        toast.error(error.response?.data?.message || 'Login failed.');
        throw error;
    }
};

export const signupUser = async (username: string, email: string, password: string, latitude: number, longitude: number, role: string) => {
    try {
        const response = await api.post('/api/users/signup', { username, email, password, latitude, longitude, role });
        return response.data;
    } catch (error: any) {
        console.error('Signup API error:', error);
        throw new Error(error.response?.data?.message || 'Signup failed.');
    }
};
// Refresh Token Logic
export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await api.post('/api/users/refresh-token', { token: refreshToken });

        if (response.data.token) {
            // Update tokens
            localStorage.setItem('token', response.data.token);
            return response.data.token;
        }
    } catch (error: any) {
        console.error('Refresh token failed:', error.message);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.post('/api/users/logout');
        return response.data;
    } catch (error) {
        throw new Error('Logout failed.');
    }
};