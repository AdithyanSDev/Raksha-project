// services/donationService.ts
import api from './axiosConfig';
import { RootState } from '../redux/store';
import { store } from '../redux/store';



export const createMaterialDonation = async (data: FormData) => {
    const state: RootState = store.getState();
    const userId = state.auth.userId;
    if (!userId) {
        throw new Error("User ID is missing in the state.");
      }
    // Append userId to the form data
    data.append('userId', userId);

    const response = await api.post('/api/material/create', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
export const fetchApprovedMaterialDonations = async () => {
    const response = await api.get('/api/material/approved');
    return response.data;
  };
  
  export const fetchPendingMaterialDonations = async () => {
    const response = await api.get('/api/material/pending');
    return response.data;
  };
  
  export const updateDonationStatus = async (
    id: string,
    status: 'approved' | 'rejected',
    cancelReason?: string
  ) => {
    const response = await api.patch(`/api/material/${id}/status`, {
      status,
      cancelReason,
    });
    return response.data;
  };
  


export const createMonetaryDonation = async (data: {
    amount: number;
    paymentMethod: string;
    coverFees: boolean;
}) => {
    const state: RootState = store.getState();
    const userId = state.auth.userId;
    console.log(userId,"asofu")
    console.log(data,"data")
    const response = await api.post('/api/monetary/create-order', {
        ...data,
        userId
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};



export const fetchMonetaryDonations = async () => {
    const response = await api.get('/api/monetary/all', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(response,"haii")
    return response.data;
};