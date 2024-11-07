// ChatContainer.tsx
import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import ChatBot from "../components/Chatbot";

const ChatContainer: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => setIsChatOpen(!isChatOpen);

  return (
    <>
      {!isChatOpen && (
        <button
          onClick={handleChatToggle}
          className="fixed bottom-4 right-4 bg-blue-600 p-4 rounded-full shadow-lg text-white z-50"
        >
          <FiMessageSquare size={24} />
        </button>
      )}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-[400px] h-[600px] bg-white shadow-lg rounded-lg z-50 overflow-hidden">
          <button
            onClick={handleChatToggle}
            className="absolute top-2 right-2 text-gray-500 text-xl"
          >
            ✖
          </button>
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
