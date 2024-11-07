// src/services/alertService.ts
import axios from "axios";

export const fetchAlerts = async () => {
  const response = await axios.get("/api/alerts"); // Adjust endpoint if needed
  return response.data.alerts || response.data; 
};

export const createAlert = async (alertData: any) => {
  const response = await axios.post("/api/alerts", alertData);
  return response.data;
};
