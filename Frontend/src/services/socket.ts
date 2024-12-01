import { io } from "socket.io-client";

// Backend URL
const BACKEND_URL = "http://localhost:5000"; // Ensure this matches your backend
const socket = io(BACKEND_URL, {
  transports: ["websocket", "polling"], // Fallback to polling if WebSocket fails
});

export default socket;
