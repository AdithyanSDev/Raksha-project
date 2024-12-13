import { Request, Response } from 'express';

export interface IChatbotController {
  handleChat(req: Request, res: Response): Promise<void>;
  reportEmergency(req: Request, res: Response): Promise<void>;
}
