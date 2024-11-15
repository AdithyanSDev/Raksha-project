// volunteerService.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

export interface VolunteerData {
   
    _id: string;
    availabilityStatus: string;
    profilePicture: string | undefined;
    name: string;
    email: string;
    userId: string;
    role: string;
    skills: string[];
    experience: number;
    status: string;
    location: {
        latitude: number;
        longitude: number;
    };
}


export const registerVolunteerService = async (volunteerData: VolunteerData) => {
    try {
        const { data } = await axios.post('/api/volunteer', { ...volunteerData, status: 'Requested' }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Failed to register volunteer');
    }
};


export const fetchVolunteers = async (): Promise<VolunteerData[]> => {
    try {
        const { data } = await axios.get('/api/volunteers', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Auth token if needed
            },
        });
        return data;
    } catch (error) {
        throw new Error('Failed to fetch volunteers');
    }
};
export const fetchPendingVolunteers = async (): Promise<VolunteerData[]> => {
    try {
        const { data } = await axios.get('/api/volunteers/pending', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('Fetched volunteers:', data);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch pending volunteers');
    }
};


// volunteerService.ts
export const approveVolunteer = async (volunteerId: string) => {
    try {
        await axios.put(`/api/volunteers/${volunteerId}/approve`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    } catch (error) {
        throw new Error('Failed to approve volunteer');
    }
};



export const rejectVolunteer = async (volunteerId: string) => {
    try {
        await axios.put(`/api/volunteers/${volunteerId}/reject`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    } catch (error) {
        throw new Error('Failed to reject volunteer');
    }
};


// volunteerService.ts
export const checkVolunteerStatus = async (userId: string): Promise<boolean> => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/volunteers/check/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return data.isVolunteer; // Expects { isVolunteer: boolean }
    } catch (error) {
        console.error('Error checking volunteer status:', error);
        throw new Error('Failed to check volunteer status');
    }
};
