import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/UserRoutes';
import adminRoutes from './routes/adminRoutes';
import resourceRequestRoutes from './routes/ResourceRoutes';
import VolunteerRoutes from './routes/VolunteerRoutes';
import chatbotRoutes from './routes/chatRoutes'
import googleAuthRoutes from './routes/auth'
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import './googleAuth/passport'; 
import DonationRoutes from './routes/DonationRoutes';
import alertRoutes from './routes/alertRoutes';
import { AlertService } from './services/AlertService';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Include credentials (cookies, authorization headers, etc.)
}));

// Initialize session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookies in production
}));

// Initialize Passport and restore session
app.use(passport.initialize());
app.use(passport.session());

const alertService = new AlertService();

setInterval(async () => {
    await alertService.fetchEONETAlerts();
  }, 60 * 60 * 1000); 

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/resources', resourceRequestRoutes);
app.use('/api',VolunteerRoutes)
app.use('/api/',DonationRoutes)
app.use('/api', alertRoutes);
app.use('/api', chatbotRoutes);

export default app;
