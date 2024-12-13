import express from 'express';
import { AdminAlertController } from '../controllers/AdminAlertController';
import { authMiddleware } from '../middlewares/authMiddleware';


const router = express.Router();
const adminAlertController = new AdminAlertController();

router.post('/alerts', adminAlertController.createCustomAlert);  // Create alert
router.get('/alerts',authMiddleware, adminAlertController.getCustomAlerts);  // Fetch all alerts

export default router;
