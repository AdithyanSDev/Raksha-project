import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { googleAuthCallback } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../multer/upload';

const router = Router();
const userController = new UserController();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken); 
router.post('/verify-otp', userController.verifyOtp);

router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-forgot-otp", userController.verifyForgotOtp);
router.post("/reset-password", userController.resetPassword);
router.post('/resend-otp', userController.resendOtp);


// Define Google OAuth route
router.get('/auth/google/callback', googleAuthCallback);


router.get('/profile',authMiddleware, userController.getUserProfile); 
router.put('/profile',authMiddleware, userController.updateUserProfile);
router.post('/upload-profile-picture', authMiddleware, upload.single('profilePicture'), userController.uploadProfilePicture);



export default router;
