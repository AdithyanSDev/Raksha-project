import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { logger } from "./middlewares/logger";
import errorMiddleware from "./middlewares/errorMiddleware";
import userRoutes from "./routes/UserRoutes";
import adminRoutes from "./routes/adminRoutes";
import resourceRequestRoutes from "./routes/ResourceRoutes";
import VolunteerRoutes from "./routes/VolunteerRoutes";
import chatbotRoutes from "./routes/chatRoutes";
import googleAuthRoutes from "./routes/auth";

import "./googleAuth/passport";
import DonationRoutes from "./routes/DonationRoutes";
import alertRoutes from "./routes/alertRoutes";
import path from "path";



import { AlertService } from "./services/AlertService";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

const currentDir = path.resolve();
const frontendPath = path.join(currentDir, "../Frontend/dist");


app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Initialize session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure cookies in production
  })
);

// Initialize Passport and restore session
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
app.use(errorMiddleware);

// Alert fetching every hour
const alertService = new AlertService();
setInterval(async () => {
  await alertService.fetchEONETAlerts();
}, 60 * 60 * 1000);

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/resources", resourceRequestRoutes);
app.use("/api", VolunteerRoutes);
app.use("/api/", DonationRoutes);
app.use("/api", alertRoutes);
app.use("/api", chatbotRoutes);

export default app;
