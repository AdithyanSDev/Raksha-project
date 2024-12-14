// volunteerService.ts
import api from './axiosConfig'; 



interface User {
    phoneNumber?: string;
    location: {
      latitude: number;
      longitude: number;
    };
    // Add other properties of User here
  }

export interface VolunteerData {
   
    _id: string;
    availabilityStatus: string;
    profilePicture: string | undefined;
    name: string;
    email: string;
    phone:string
    userId: string;
    role: string;
    skills: string[];
    experience: number;
    status: string;
    location: {
        latitude: number;
        longitude: number;
    };
    tasks:string[]
    user: User;
}



export const registerVolunteerService = async (volunteerData: VolunteerData) => {
    try {
        const { data } = await api.post('/api/volunteer', { ...volunteerData, status: 'Requested' }, {
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
        const { data } = await api.get('/api/volunteers', {
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
        const { data } = await api.get('/api/volunteers/pending', {
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
        await api.put(`/api/volunteers/${volunteerId}/approve`, {}, {
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
        await api.put(`/api/volunteers/${volunteerId}/reject`, {}, {
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
        const { data } = await api.get(`/api/volunteers/check/${userId}`, {
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

export async function assignTaskToVolunteer(volunteerId: string, task: string): Promise<void> {
    console.log(volunteerId);
    await api.put(`/api/volunteers/${volunteerId}/assign-task`, { task });
  }

  export const fetchVolunteerById = async (id: string): Promise<VolunteerData> => {
    const response = await api.get(`/api/volunteers/${id}`);
    return response.data;
  };
  
  export const fetchVolunteerDataByUserId = async (userId: string): Promise<VolunteerData> => {
    try {
        const { data } = await api.get(`/api/volunteer/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Failed to fetch volunteer data');
    }
};

export const updateVolunteerProfile = async (volunteerId: string, updatedData: Partial<VolunteerData>): Promise<VolunteerData> => {
    try {
        const { data } = await api.put(`/api/volunteers/${volunteerId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return data;
    } catch (error) {
        throw new Error("Failed to update volunteer profile");
    }
}; 
