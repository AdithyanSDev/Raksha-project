import { Router } from 'express';
import MaterialDonationController from '../controllers/MaterialDonationController';
import MonetaryDonationController from '../controllers/MonetaryDonationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../middlewares/upload';

const router = Router();

router.post('/monetary/create-order', MonetaryDonationController.createOrder);
router.post('/monetary/verify-payment', MonetaryDonationController.verifyPayment);

// Add upload middleware to handle images for material donations
router.post(
  '/material/create',
   // Ensure user is authenticated
  upload.array('materialImages'), // Upload middleware for handling multiple images
  MaterialDonationController.createMaterialDonation
);

router.post('/material/approve/:id', MaterialDonationController.approveDonation);
router.post('/material/reject/:id', MaterialDonationController.rejectDonation);

export default router;
