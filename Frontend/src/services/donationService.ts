// services/donationService.ts
import axios from 'axios';
import { RootState } from '../redux/store';
import { store } from '../redux/store';

const API_URL = 'http://localhost:5000/api';

export const createMaterialDonation = async (data: FormData) => {
    const state: RootState = store.getState();
    const userId = state.auth.userId;
    if (!userId) {
        throw new Error("User ID is missing in the state.");
      }
    // Append userId to the form data
    data.append('userId', userId);

    const response = await axios.post(`${API_URL}/material/create`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
export const fetchApprovedMaterialDonations = async () => {
    const response = await axios.get(`${API_URL}/material/approved`);
    return response.data;
  };
  
  export const fetchPendingMaterialDonations = async () => {
    const response = await axios.get(`${API_URL}/material/pending`);
    return response.data;
  };
  
  export const updateDonationStatus = async (
    id: string,
    status: 'approved' | 'rejected',
    cancelReason?: string
  ) => {
    const response = await axios.patch(`${API_URL}/material/${id}/status`, {
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
    const response = await axios.post(`${API_URL}/monetary/create-order`, {
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
    const response = await axios.get(`${API_URL}/monetary/all`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(response,"haii")
    return response.data;
};