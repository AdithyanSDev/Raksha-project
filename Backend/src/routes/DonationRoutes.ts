import { Router } from 'express';
import MaterialDonationController from '../controllers/MaterialDonationController';
import MonetaryDonationController from '../controllers/MonetaryDonationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../multer/upload';

const router = Router();

router.post('/monetary/create-order',authMiddleware, MonetaryDonationController.createOrder);
router.post('/monetary/verify-payment', MonetaryDonationController.verifyPayment);
router.get('/monetary/all', MonetaryDonationController.getAllMonetaryDonations);


router.post(
  '/material/create',
  upload.array('materialImages'), 
  MaterialDonationController.createMaterialDonation
);
router.get('/material/approved', MaterialDonationController.getApprovedDonations);
router.get('/material/pending', MaterialDonationController.getPendingDonations);
router.patch('/material/:id/status', MaterialDonationController.updateDonationStatus);

export default router;
