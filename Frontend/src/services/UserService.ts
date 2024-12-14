// services/userService.ts
import api from './axiosConfig';

const API_URL = '/api/users'; 

export interface IUser {
    _id: string;
    username: string;
    profilePicture: string;
    email: string;
    isBlocked: boolean;
    role: 'admin' | 'user';
}

export const getUserProfile = async () => {
    try {
        console.log("Fetching user profile...");
        const response = await api.get(`${API_URL}/profile`);
        console.log(response.data, "response");
        return response.data;
    } catch (error:any) {
        // Log detailed error information
        if (error.response?.status === 401) {
            console.error('Unauthorized: Token might be invalid or expired.');
        }
        console.error('Unexpected error:', error);
        throw error; // Rethrow to handle error in calling code
    }
};

export const updateUserProfile = async (data: any) => {
    try {
        const response = await api.put(`${API_URL}/profile`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const uploadProfilePictureToS3 = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await api.post(`${API_URL}/upload-profile-picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.profilePictureUrl;
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        throw error;
    }
};

export const fetchUsers = async (): Promise<IUser[]> => {
    try {
        const response = await api.get('/api/admin/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const toggleUserStatus = async (userId: string, newStatus: boolean): Promise<IUser> => {
    try {
        const response = await api.patch(`/api/admin/users/${userId}/status`, { isBlocked: newStatus });
        return response.data;
    } catch (error) {
        console.error('Error toggling user status:', error);
        throw error;
    }
};
