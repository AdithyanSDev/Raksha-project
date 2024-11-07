// ChatBot.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import Message from "./Message";
import EmergencyForm from "./EmergencyForm";
import { sendMessage, reportEmergency } from "../services/emergencyService";

interface MessageProps {
  text: string;
  sender: "user" | "bot";
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const userId = useSelector((state: any) => state.auth.userId);

  useEffect(() => {
    addMessage("Do you need any help?", "bot");
  }, []);

  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleUserMessage = async (text: string) => {
    addMessage(text, "user");
    setIsTyping(true);

    try {
      const botReply = await sendMessage(text, { userId });
      showTypingEffect(botReply.response);

      // Trigger emergency form if message contains specific keywords (case-insensitive)
      if (/emergency|urgent|help/i.test(text)) {
        console.log("Emergency keyword detected, setting isEmergency to true");
        setIsEmergency(true);
      }
    } catch (error) {
      console.error("Error sending user message:", error);
      addMessage("Something went wrong. Please try again.", "bot");
      setIsTyping(false);
    }
  };

  const showTypingEffect = (text: string) => {
    setTypingMessage("");
    let index = 0;

    const typeInterval = setInterval(() => {
      setTypingMessage((prev) => prev + text[index]);
      index++;

      if (index === text.length) {
        clearInterval(typeInterval);
        addMessage(text, "bot");
        setIsTyping(false);
      }
    }, 50);
  };

  const handleEmergencyReport = async (emergencyData: any) => {
    try {
      await reportEmergency({ ...emergencyData, userId });
      addMessage("Thank you! Our team will contact you shortly.", "bot");
      setIsEmergency(false); // Close form after submission
    } catch {
      addMessage("Failed to report emergency. Please try again.", "bot");
    }
  };

  return (
    <div className="p-4 max-w-lg h-[600px] mx-auto bg-gray-100 shadow-md rounded-lg flex flex-col">
      <div className="border-b border-gray-300 pb-2 mb-2">
        <h2 className="text-lg font-semibold text-green-800">Raksha</h2>
        <span className="text-sm text-gray-600 mt-1">We’ll reply as soon as we can</span>
      </div>

      <div className="flex-1 overflow-y-auto mb-2 bg-green-50 rounded p-2">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {isTyping && <Message text={typingMessage} sender="bot" />}
      </div>

      <div className="border-t border-gray-300 pt-2">
  {isEmergency ? (
    <EmergencyForm
      setIsEmergency={setIsEmergency}
      addMessage={addMessage}
      onSubmit={handleEmergencyReport}
    />
  ) : (
    <ChatInput onSend={handleUserMessage} />
  )}
</div>
    </div>
  );
};

export default ChatBot;
