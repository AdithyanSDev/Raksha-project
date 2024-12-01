import  { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // To access Redux state
import socket from "../services/socket";

const UserChat = () => {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [message, setMessage] = useState("");
  const userId = useSelector((state: any) => state.auth.userId); // User ID from Redux
  const roomId = userId ? `room_${userId}_admin` : null;


  useEffect(() => {
    if (roomId) {
      // Join room on component mount
      socket.emit("join_room", { roomId });

      // Listen for incoming messages
      socket.on("receive_message", ({ sender, message }) => {
        setMessages((prev) => [...prev, { sender, message }]);
      });

      return () => {
        socket.off("receive_message");
      };
    }
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() && roomId) {
      const sender = userId || "Admin"; // Sender (User/Admin)
      socket.emit("send_message", { roomId, message, sender });
      setMessages((prev) => [...prev, { sender, message }]);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-1/2 mx-auto">
      <h2 className="text-lg font-bold mb-4">Chat</h2>
      <div className="mb-4 h-64 overflow-y-auto border p-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 ${
              msg.sender === (userId || "Admin") ? "text-right" : "text-left"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;
