import { IMessageRepository } from '../interfaces/repositories/IChatbotRepository';
import EmergencyAlert from '../models/EmergencyAlert';
import { EmergencyAlertDTO } from '../dtos/EmergencyDTO';

export class MessageRepository implements IMessageRepository {
  async getAllEmergencyAlerts(): Promise<any[]> {
    return await EmergencyAlert.find().sort({ timestamp: -1 });
  }

  async createEmergencyAlert(data: EmergencyAlertDTO): Promise<any> {
    const alert = new EmergencyAlert(data);
    return await alert.save();
  }
}
