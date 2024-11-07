// backend/src/routes/adminRoutes.ts
import express from 'express';
import { adminLogin } from '../controllers/adminController';
import BannerController from '../controllers/BannerController';
import upload from '../middlewares/upload';

const router = express.Router();

// Route for admin login
router.post('/login', adminLogin);

router.post('/upload-banner', upload.single('bannerImage'), BannerController.uploadBanner);
router.get('/banner', BannerController.getBanner);

export default router;
    