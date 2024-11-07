// services/ChatbotService.ts
import run from '../config/gemini'; // Assuming 'run' is the exported function in gemini
import { isEmergency } from '../utils/EmergencyChecker';
import { MessageRepository } from '../repositories/MessageRepository';
import { User } from '../models/User';

class ChatbotService {
  private messageRepo: MessageRepository;

  constructor() {
    this.messageRepo = new MessageRepository();
  }

  async handleUserMessage(message: string, userInfo: { userId: string, name?: string, email?: string, phone?: string, location?: string }) {
      // Call the Gemini configuration's run method
      try {
        const response = await run(message); // Pass message to run
        return { response };
      } catch (error) {
        console.error('Error in Gemini run:', error);
        return { response: 'Sorry, there was an error processing your request.' };
      }
    
  }
  async reportEmergency(data: {
    name: string;
    email: string;
    phone: string;
    location: string;
    userId: string;
  }) {
    return await this.messageRepo.createEmergencyAlert(data);
  }
}


export default new ChatbotService();
