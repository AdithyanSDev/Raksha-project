// controllers/chatbotController.ts
import { Request, Response } from 'express';
import ChatbotService from '../services/ChatbotService';

class ChatbotController {
  async handleChat(req: Request, res: Response) {
    const { message, user } = req.body;
    const response = await ChatbotService.handleUserMessage(message, user);
    res.json(response);
  }

  // async getEmergencyAlerts(req: Request, res: Response) {
  //   try {
  //     const alerts = await ChatbotService.getAllEmergencyAlerts(); // Moved to the service layer
  //     res.json(alerts);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to retrieve alerts' });
  //   }
  // }

  // Refactored reportEmergency method
  async reportEmergency(req: Request, res: Response) {
    try {
      const { name, email, phone, location, userId } = req.body;
      if (!userId || !name || !email || !phone || !location ) {
        console.error("Missing required fields:", req.body);
        return res.status(400).json({ error: "All fields are required." });
      }
      const newAlert = await ChatbotService.reportEmergency({ name, email, phone, location, userId });
      
      res.status(201).json({ message: 'Emergency alert created successfully', alert: newAlert });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create emergency alert', error });
    }
  }
}

export const chatbotController = new ChatbotController();
