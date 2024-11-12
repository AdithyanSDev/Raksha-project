// backend/src/routes/adminRoutes.ts
import express from 'express';
import { adminLogin } from '../controllers/adminController';
import { UserController } from '../controllers/UserController';
import BannerController from '../controllers/BannerController';
import upload from '../middlewares/upload';

const router = express.Router();
const userController = new UserController();

// Route for admin login
router.post('/login', adminLogin);

router.post('/upload-banner', upload.single('bannerImage'), BannerController.uploadBanner);
router.get('/banner', BannerController.getBanner);

router.get("/users", userController.getAllUsers);
router.patch("/users/:userId/status", userController.toggleUserStatus);
export default router;
    