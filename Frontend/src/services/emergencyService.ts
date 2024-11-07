import api from './axiosConfig';

export const sendMessage = async (message: string, user: { userId: string; }) => {
  try {
    const response = await api.post('/api/chat', { message, user });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send message');
  }
};

export const reportEmergency = async (emergencyData: any) => {
  try {
    await api.post('/api/emergency/report', emergencyData); // Emergency report endpoint
  } catch (error) {
    throw new Error('Failed to report emergency');
  }
};
