// components/Message.tsx
import React from 'react';

interface MessageProps {
  text: string;
  sender: 'user' | 'bot';
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  return (
    <div className={`mb-2 p-2 rounded ${sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
      {text}
    </div>
  );
};

export default Message;
