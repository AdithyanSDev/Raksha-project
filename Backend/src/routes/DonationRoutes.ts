import { Router } from 'express';
import MaterialDonationController from '../controllers/MaterialDonationController';
import MonetaryDonationController from '../controllers/MonetaryDonationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../middlewares/upload';

const router = Router();

router.post('/monetary/create-order',authMiddleware, MonetaryDonationController.createOrder);
router.post('/monetary/verify-payment', MonetaryDonationController.verifyPayment);


router.post(
  '/material/create',
  upload.array('materialImages'), 
  MaterialDonationController.createMaterialDonation
);

router.post('/material/approve/:id', MaterialDonationController.approveDonation);
router.post('/material/reject/:id', MaterialDonationController.rejectDonation);

// router.get('/material/all', authMiddleware, MaterialDonationController.getAllMaterialDonations);
// router.get('/monetary/all', authMiddleware, MonetaryDonationController.getAllMonetaryDonations);

export default router;
