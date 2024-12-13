import axios from "axios";

export const fetchAlerts = async (token: string) => {
  const response = await axios.get("/api/alerts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.alerts || response.data;
};

export const createAlert = async (alertData: any, token: string) => {
  const response = await axios.post("/api/alerts", alertData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
