import api from './axiosConfig';

export const fetchAlerts = async (token: string) => {
    const response = await api.get('/api/alerts', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.alerts || response.data;
};

export const createAlert = async (alertData: any, token: string) => {
    const response = await api.post('/api/alerts', alertData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
