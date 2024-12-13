import run from '../config/gemini';
import { IChatbotService } from '../interfaces/services/IChatbotService';
import { ChatbotUserDTO } from '../dtos/ChatbotDTO';
import { EmergencyAlertDTO } from '../dtos/EmergencyDTO';
import { MessageRepository } from '../repositories/MessageRepository';
import { isEmergency } from '../utils/EmergencyChecker';

class ChatbotService implements IChatbotService {
  private messageRepo = new MessageRepository();

  async handleUserMessage(message: string, userInfo: ChatbotUserDTO): Promise<{ response: string }> {
    if (isEmergency(message)) {
      return { response: "Please fill out the emergency form to report your situation." };
    }

    try {
      const response = await run(message);
      return { response };
    } catch (error) {
      console.error('Error in Gemini run:', error);
      return { response: 'Sorry, there was an error processing your request.' };
    }
  }

  async reportEmergency(data: EmergencyAlertDTO): Promise<any> {
    return this.messageRepo.createEmergencyAlert(data);
  }
}

export default new ChatbotService();
