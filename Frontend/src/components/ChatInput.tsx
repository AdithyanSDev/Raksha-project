// components/ChatInput.tsx
import React, { useEffect, useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [placeholder, setPlaceholder] = useState('Ask your doubt...');
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const placeholders = ["Ask your doubt...", "Type 'help' for any emergency"];
    let index = 0;

    const interval = setInterval(() => {
      // Start transition effect
      setTransitioning(true);

      setTimeout(() => {
        index = (index + 1) % placeholders.length;
        setPlaceholder(placeholders[index]);
        setTransitioning(false); // End transition effect
      }, 500); // Match transition duration
    }, 3000); // Change placeholder every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="flex">
      <div className="relative flex-grow">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-l"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        {/* Placeholder with animation */}
        <div
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-500 ease-in-out ${
            transitioning ? '-translate-y-full opacity-0' : 'opacity-100'
          }`}
          style={{ transitionProperty: 'transform, opacity' }}
        >
          {placeholder}
        </div>
      </div>
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
