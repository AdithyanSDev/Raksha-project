import { Request, Response } from 'express';
import { IChatbotController } from '../interfaces/controllers/IChatbotController';
import ChatbotService from '../services/ChatbotService';

class ChatbotController implements IChatbotController {
  async handleChat(req: Request, res: Response): Promise<void> {
    const { message, user } = req.body;

    try {
      const response = await ChatbotService.handleUserMessage(message, user);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process chat message', details: error });
    }
  }

  async reportEmergency(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, location, userId } = req.body;

      if (!userId || !name || !email || !phone || !location) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      const alert = await ChatbotService.reportEmergency({ name, email, phone, location, userId });
      res.status(201).json({ message: 'Emergency alert created successfully', alert });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create emergency alert', details: error });
    }
  }
}

export const chatbotController = new ChatbotController();
