import React, { useState, useEffect, useRef } from 'react';
import Refresh from '@/assets/refresh.svg';

interface ChatProps {
  messages: { text: string, isUser: boolean }[];
  onSendMessage: (text: string, isUser: boolean) => void;
  onClearMessages: () => void;
}

interface TopicScore {
  topicScore: number;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, onClearMessages }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTopOverlay, setShowTopOverlay] = useState(false);
  const [showBottomOverlay, setShowBottomOverlay] = useState(false);
  const chatContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      const userMessages = messages.filter(message => message.isUser).map(message => message.text).join(' ');
      fetchScore(userMessages);
    }

    toLastMessage();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContentsRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContentsRef.current;
        setShowTopOverlay(scrollTop > 0);
        setShowBottomOverlay(scrollTop + clientHeight < scrollHeight);
      }
    };

    const chatContents = chatContentsRef.current;
    if (chatContents) {
      chatContents.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (chatContents) {
        chatContents.removeEventListener('scroll', handleScroll);
      }
    };
  }, [messages]);

  const fetchScore = async (userMessages: string) => {
    setLoading(true);
    setError(null);
    onSendMessage('Generating response...', false);
    try {
      const scoreResponse = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userMessages })
      });
      const scoreData: TopicScore = await scoreResponse.json();
      onSendMessage(`Your score is ${scoreData.topicScore}`, false);
    } catch (error) {
      setError('Model is loading...');
      onSendMessage('An error occurred while fetching the response.', false);
      console.error('Error fetching score:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshClick = () => {
    if (window.confirm('Do you want to start a new chat from the beginning?')) {
      onClearMessages();
    }
  };

  const toLastMessage = () => {
    if (!chatContentsRef.current || showBottomOverlay) return;

    chatContentsRef.current?.scrollTo({
      top: chatContentsRef.current.scrollHeight + 10,
      behavior: 'smooth'
    });
  }

  return (
    <div className="chat-container">
      {messages.length > 0 && (
        <div className="chat-header">
          <h2>Chat</h2>
          <button className="img_btn" aria-label="new chat" title="new chat" onClick={handleRefreshClick}>
            <img src={Refresh} alt=""/>
          </button>
        </div>
      )}
      <div className="chat-contents">
        {showTopOverlay && <div className="gradient-overlay top"></div>}
        <div className="chat-messages" ref={chatContentsRef}>
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
            <div className="chat-bubble response">
              {error}
            </div>
          )}
        </div>
        {showBottomOverlay && <div className="gradient-overlay bottom"></div>}
      </div>
    </div>
  );
};

export default Chat;