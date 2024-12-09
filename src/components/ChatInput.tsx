import React, { useState } from 'react';
import SendFill from '@/assets/send_fill.svg';

interface ChatInputProps {
  onSendMessage: (text: string, isUser: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(textarea.value);
  };

  const handleSendMessage = () => {
    if (text.trim()) {
      onSendMessage(text, true);
      setText('');
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Please tell us the restaurant you are looking for"
        rows={1}
      />
      <button
        aria-label="search"
        onClick={handleSendMessage}
        disabled={!text.trim()}
      >
        <img src={SendFill} alt=""/>
      </button>
    </div>
  );
};

export default ChatInput;