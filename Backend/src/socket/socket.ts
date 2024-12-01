import { Server } from "socket.io";

interface ConnectedUsers {
  [key: string]: { socketId: string; role: string };
}
console.log("heyy hello")

const connectedUsers: ConnectedUsers = {};
console.log("heyy initialized")
const initializeSocket = (io: Server) => {
  console.log("Socket.IO initialized");
  io.on("connection", (socket) => {
    console.log(`Socket.IO client connected: ${socket.id}`);
    console.log(`User connected: ${socket.id}`);

    // User joins with userId and role
    socket.on("user_join", ({ userId, role }) => {
      connectedUsers[userId] = { socketId: socket.id, role };
      console.log(`${role} joined: ${userId}`);
      if (role === "admin") {
        // Notify users that admin is online
        io.emit("admin_online", { adminId: userId });
      } else {
        // Notify admin about the new user
        const admin = Object.values(connectedUsers).find((u) => u.role === "admin");
        if (admin) {
          io.to(admin.socketId).emit("update_users", Object.keys(connectedUsers));
        }
      }
    });

    // User sends a message
    socket.on("send_message", ({ userId, message, audioFile }) => {
      const admin = Object.values(connectedUsers).find((u) => u.role === "admin");
      if (admin) {
        io.to(admin.socketId).emit("receive_message", {
          userId,
          message: audioFile || message,
          type: audioFile ? "audio" : "text",
        });
      }
    });

    // Admin replies to a user
    socket.on("reply_message", ({ userId, message, audioFile }) => {
      const user = connectedUsers[userId];
      if (user) {
        io.to(user.socketId).emit("receive_reply", {
          message: audioFile || message,
          type: audioFile ? "audio" : "text",
        });
      }
    });
    socket.on("send_audio_message", ({ userId, audioFile }) => {
      const adminSocketId = connectedUsers["admin"]?.socketId;
      if (adminSocketId) {
        io.to(adminSocketId).emit("receive_audio_message", {
          userId,
          message: audioFile,
          type: "audio",
        });
      }
    });
    

    // User disconnects
    socket.on("disconnect", () => {
      const userId = Object.keys(connectedUsers).find((id) => connectedUsers[id].socketId === socket.id);
      if (userId) {
        const role = connectedUsers[userId].role;
        delete connectedUsers[userId];
        console.log(`${role} disconnected: ${userId}`);
        if (role === "admin") {
          io.emit("admin_offline", { adminId: userId });
        }
      }
    });
  });
};

export default initializeSocket;
