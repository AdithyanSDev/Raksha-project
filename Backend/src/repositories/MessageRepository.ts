// repositories/messageRepository.ts
import EmergencyAlert from '../models/EmergencyAlert';

export class MessageRepository {
  async sendEmergencyToAdmin(data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    message: string;
    timestamp: string;
  }) {
    const emergencyAlert = new EmergencyAlert(data);
    await emergencyAlert.save();
  }

  async getAllEmergencyAlerts() {
    return await EmergencyAlert.find().sort({ timestamp: -1 });
  }
  async createEmergencyAlert(data: {
    name: string;
    email: string;
    phone: string;
    location: string;
    userId: string;
  }) {
    const emergencyAlert = new EmergencyAlert(data);
    return await emergencyAlert.save();
  }
}
