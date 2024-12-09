import React, { useRef, useState } from 'react';
import useResizer from '../hooks/useResizer';
import PromptRecommendation from '@/components/PromptRecommendation';
import ChatInput from '@/components/ChatInput';
import Chat from './Chat';
import '@/styles/LeftPanel.css';

export interface ChatProps {
  text: string,
  isUser: boolean
}

const LeftPanel: React.FC = () => {
  const resizerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatProps[]>([]);

  useResizer(resizerRef, leftPanelRef);

  const handleSendMessage = (text: string, isUser: boolean) => {
    setMessages([...messages, { text, isUser }]);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  return (
    <aside className="panel left-panel" ref={leftPanelRef} style={{width: 300}}>
      <div className="resizer" id="resizer" ref={resizerRef}/>
      {!messages.length && (
        <PromptRecommendation onClickRecommendation={handleSendMessage}/>
      )}
      <Chat messages={messages} onSendMessage={handleSendMessage} onClearMessages={handleClearMessages}/>
      <ChatInput onSendMessage={handleSendMessage}/>
    </aside>
  );
};

export default LeftPanel;