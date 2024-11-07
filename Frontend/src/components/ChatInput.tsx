// components/ChatInput.tsx
import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        className="flex-grow p-2 border border-gray-300 rounded-l"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-r"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
