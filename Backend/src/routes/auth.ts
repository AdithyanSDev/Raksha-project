import express from 'express';
import passport from 'passport';
import { googleAuthCallback } from '../controllers/AuthController';

const router = express.Router();

// Google OAuth route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', googleAuthCallback);

export default router;
