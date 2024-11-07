import express from 'express';
import { AdminAlertController } from '../controllers/AdminAlertController';

const router = express.Router();
const adminAlertController = new AdminAlertController();

router.post('/alerts', adminAlertController.createCustomAlert);  // Create alert
router.get('/alerts', adminAlertController.getCustomAlerts);  // Fetch all alerts

export default router;
