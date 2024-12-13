import { EmergencyAlertDTO } from "../../dtos/EmergencyDTO";

export interface IMessageRepository {
    getAllEmergencyAlerts(): Promise<any[]>;
    createEmergencyAlert(data: EmergencyAlertDTO): Promise<any>;
  }
  