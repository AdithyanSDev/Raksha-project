// services/userService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export interface IUser {
    _id: string;
    username: string;
    profilePicture:string;
    email: string;
    isBlocked: boolean;
    role : 'admin' | 'user';
}

export const getUserProfile = async () => {
    const token = localStorage.getItem('token'); 
    console.log(token, "token");
    if (!token) {
        throw new Error("No token found, please login again.");
    }

    try {
        console.log( "response");
        const response = await axios.get(`${API_URL}/profile`, {
           
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log(response, "response");
        return response.data;
    } catch (error) {
        // Log detailed error information
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response);
            if (error.response?.status === 401) {
                console.error('Unauthorized: Token might be invalid or expired.');
            }
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // rethrow to handle error in calling code
    }
};

export const updateUserProfile = async (data: any, token: string) => {
    const response = await axios.put(`${API_URL}/profile`, data, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
        },
    });
    return response.data;
};

export const uploadProfilePictureToS3 = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
  
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.post(`${API_URL}/upload-profile-picture`, formData, config);
    return response.data.profilePictureUrl;
  };

  export const fetchUsers = async (): Promise<IUser[]> => {
    const response = await axios.get("/api/admin/users");
    return response.data;
};

export const toggleUserStatus = async (userId: string, newStatus: boolean): Promise<IUser> => {
    const response = await axios.patch(`/api/admin/users/${userId}/status`, { isBlocked: newStatus });
    return response.data;
};
