import api from './axiosConfig';  // Import the axios instance

export const sendResourceRequest = async (formData: any, token: string) => {
  try {
    const userId = formData.userId;

    const dataToSend = {
      ...formData,
      userId, // Include userId in the request
    };

    const response = await api.post('/api/resources/request', dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization is handled by axios interceptors, but you can still include it here if needed.
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error('Error sending resource request:', error);
    throw error; // Propagate the error for handling
  }
};

export const approveRequest = async (id: string, token: string) => {
  try {
    const response = await api.put(`/api/resources/request/${id}/approve`, {}, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error approving request:', error);
    throw error;
  }
};

export const rejectRequest = async (id: string, reason: string, token: string) => {
  try {
    const response = await api.put(`/api/resources/request/${id}/reject`, 
      { rejectionReason: reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error('Error rejecting request:', error);
    throw error;
  }
};

export const fetchRequestsByStatus = async (status: string, token: string) => {
  try {
    const response = await api.get(`/api/resources/requests/${status}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
};
