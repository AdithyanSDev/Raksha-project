// src/repositories/AlertRepository.ts

import { Alert, IAlert } from '../models/Alert';

export class AlertRepository {
  
  // Create a new alert
  async createAlert(alertData: Partial<IAlert>): Promise<IAlert> {
    const alert = new Alert(alertData);
    return await alert.save();
  }

  // Find an alert by title to prevent duplicates
  async findAlertByTitle(title: string): Promise<IAlert | null> {
    return await Alert.findOne({ title });
  }

  // Fetch all alerts
  async getAllAlerts(): Promise<IAlert[]> {
    return await Alert.find();
  }
}
