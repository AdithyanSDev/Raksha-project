import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api';

// Handle Login
export const loginUser = async (email: string, password: string, latitude: number, longitude: number) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, latitude, longitude }),
        });

        if (!response.ok) {
            const errorData = await response.json();

            // Check for blocked user error
            if (response.status === 403) {
                toast.error('You have been blocked by the admin.');
            } else {
                throw new Error(errorData.message || 'Login failed.');
            }
        }

        const data = await response.json();

        if (!data.token || !data.refreshToken || !data.user?.role) {
            throw new Error("No token, refresh token, or role received in response");
        }

        // Store tokens
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        return data;
    } catch (error: any) {
        console.error('Login API error:', error.message);
        toast.error(error.message); // Display general error message
        throw error;
    }
};

// Refresh Token Logic
export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_URL}/users/refresh-token`, { token: refreshToken });

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

// Signup API call
export const signupUser = async (username: string, email: string, password: string, latitude: number, longitude: number, role: string) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/signup', { 
            username, 
            email, 
            password,  
            latitude, 
            longitude,
            role 
        });
        return response.data;
    } catch (error: any) {
        console.error('Signup API error:', error); // Log the error for debugging
        throw new Error(error.response?.data?.message || 'Signup failed.');
    }
};


// Logout (optional, if needed)
export const logoutUser = async () => {
    try {
        // If you need to make an API call for logout, e.g., to destroy a session on the server
        const response = await axios.post('/api/users/logout');
        return response.data;
    } catch (error) {
        throw new Error('Logout failed.');
    }
};
