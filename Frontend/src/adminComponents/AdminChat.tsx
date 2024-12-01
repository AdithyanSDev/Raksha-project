import React, { useState, useEffect, useCallback } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import socket from "../services/socket";
import Sidebar from "./Sidebar";

interface ChatMessage {
  sender: string;
  message: string;
  type: "text" | "audio";
}

interface User {
  userId: string;
  isOnline: boolean;
}

const AdminChat: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.emit("admin_join", { role: "admin" });
  
    const handleUpdateUsers = (users: string[]) => {
      setActiveUsers(users.map((userId) => ({ userId, isOnline: true })));
    };
  
    const handleReceiveMessage = ({ userId, message, type }: ChatMessage & { userId: string }) => {
      if (selectedUser === userId) {
        setChat((prevChat) => [...prevChat, { sender: "User", message, type }]);
      }
    };
  
    socket.on("update_users", handleUpdateUsers);
    socket.on("receive_message", handleReceiveMessage);
  
    return () => {
      socket.off("update_users", handleUpdateUsers);
      socket.off("receive_message", handleReceiveMessage);
      socket.disconnect();
    };
  }, [selectedUser]);
  

  const sendMessage = useCallback(
    (audioFile?: string) => {
      if (!message && !audioFile) return;

      socket.emit("reply_message", { userId: selectedUser, message, audioFile });

      setChat((prevChat) => [
        ...prevChat,
        { sender: "Admin", message: audioFile || message, type: audioFile ? "audio" : "text" },
      ]);
      setMessage("");
    },
    [message, selectedUser]
  );

  const addAudioMessage = useCallback((blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => sendMessage(reader.result as string);
  }, [sendMessage]);

  return (
   
     
    <div className="h-screen bg-chat-bg flex">
      {/* Sidebar for Active Users */}
      <div className="w-1/4 bg-white border-r shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Active Users</h2>
        <ul>
          {activeUsers.map((user) => (
            <li
              key={user.userId}
              className={`cursor-pointer px-4 py-2 rounded-lg mb-2 ${
                selectedUser === user.userId ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setSelectedUser(user.userId)}
            >
              <div className="flex items-center justify-between">
                <span>User ID: {user.userId}</span>
                <span
                  className={`text-xs font-bold ${
                    user.isOnline ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow bg-white shadow-md rounded-lg p-4 overflow-y-scroll">
          {selectedUser ? (
            <>
              <h3 className="text-lg font-semibold mb-4">Chat with User ID: {selectedUser}</h3>
              <div>
                {chat.map((msg, index) => (
                  <div key={index} className={`my-2 ${msg.sender === "Admin" ? "text-right" : "text-left"}`}>
                    {msg.type === "audio" ? (
                      <audio controls src={msg.message} />
                    ) : (
                      <div
                        className={`inline-block px-4 py-2 rounded-lg ${
                          msg.sender === "Admin"
                            ? "bg-chat-bubble-sent text-white"
                            : "bg-chat-bubble-received"
                        }`}
                      >
                        {msg.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select a user to start chatting.</p>
          )}
        </div>
        {/* Input Box */}
        {selectedUser && (
          <div className="flex items-center gap-2 border-t p-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border rounded-lg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <AudioRecorder onStop={addAudioMessage} />
            <button
              onClick={() => sendMessage()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>

  );
};

export default AdminChat;
