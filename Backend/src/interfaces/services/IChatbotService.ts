import { ChatbotUserDTO } from "../../dtos/ChatbotDTO";
import { EmergencyAlertDTO } from "../../dtos/EmergencyDTO";

export interface IChatbotService {
    handleUserMessage(message: string, userInfo: ChatbotUserDTO): Promise<{ response: string }>;
    reportEmergency(data: EmergencyAlertDTO): Promise<any>;
  }
  