import React, { useEffect, useRef, useState } from 'react';
import PromptRecommendation from '@/components/PromptRecommendation';
import useChat from '@/hooks/useChat';
import Refresh from '@/assets/refresh.svg';

interface ChatProps {
  messages: { text: string, isUser: boolean }[];
  onSendMessage: (text: string, isUser: boolean) => void;
  onClearMessages: () => void;
  clearMarkers: () => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, onClearMessages, clearMarkers }) => {
  const chatContentsRef = useRef<HTMLDivElement>(null);

  const {
    loading,
    error,
    handleRetry,
    handleRefreshClick,
  } = useChat(messages, onSendMessage, onClearMessages, clearMarkers);

  useEffect(() => {
    toLastMessage();
  }, [messages]);

  const toLastMessage = () => {
    if (!chatContentsRef.current) return;

    chatContentsRef.current?.scrollTo({
      top: chatContentsRef.current.scrollHeight + 10,
      behavior: 'smooth'
    });
  };

  return !messages.length ? (
    <PromptRecommendation onClickRecommendation={onSendMessage} />
  ) : (
    <>
      <div className="chat-header">
        <h2>Chat</h2>
        <button className="img_btn" aria-label="new chat" title="new chat" onClick={handleRefreshClick}>
          <img src={Refresh} alt="" />
        </button>
      </div>

      <div className="chat-container" ref={chatContentsRef}>
        <div className="gradient-overlay top"></div>
        {!!messages.length && (
          <div className="chat-contents">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`chat-bubble ${message.isUser ? 'user' : 'response'}`}>
                  {message.text}
                </div>
              ))}
              {loading && (
                <div className="chat-bubble response">
                  Generating response...
                </div>
              )}
              {error && (
                <div className="chat-bubble response" style={{ backgroundColor: 'FF000020' }}>
                  {error}
                  <button className="retry-button" onClick={handleRetry}>Retry</button>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="gradient-overlay bottom"></div>
      </div>
    </>
  );
};

export default Chat;