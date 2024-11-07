import express from 'express';
import { chatbotController } from '../controllers/ChatbotController';

const router = express.Router();

router.post('/chat', (req, res) => chatbotController.handleChat(req, res));
router.post('/emergency/report', (req, res) => chatbotController.reportEmergency(req, res)); 

export default router;
