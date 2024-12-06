import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import passport from "passport";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

// Initialize session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure cookies in production
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});


// Initialize Passport and restore session
app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Explicitly allow WebSocket and Polling
});


// Socket.IO Connection
io.on("connection", (socket) => {
  
  console.log("A user connected:", socket.id);

  // Join Room (User/Admin)
  socket.on("join_room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Handle Chat Messages
  socket.on("send_message", ({ roomId, message, sender }) => {
    console.log("Message from user:", message);
    socket.to(roomId).emit("receive_message", { sender, message }); // Broadcast to room
  });

  // Disconnect Event
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
import userRoutes from "./routes/UserRoutes";
import adminRoutes from "./routes/adminRoutes";
import resourceRequestRoutes from "./routes/ResourceRoutes";
import VolunteerRoutes from "./routes/VolunteerRoutes";
import chatbotRoutes from "./routes/chatRoutes";
import googleAuthRoutes from "./routes/auth";

import "./googleAuth/passport";
import DonationRoutes from "./routes/DonationRoutes";
import alertRoutes from "./routes/alertRoutes";

import { AlertService } from "./services/AlertService";

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
