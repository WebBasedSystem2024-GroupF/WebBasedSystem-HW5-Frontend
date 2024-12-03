import React, { useRef, useState } from 'react';
import SendFill from '@/assets/send_fill.svg';
import '@/styles/LeftPanel.css';
import useResizer from '../hooks/useResizer';

const LeftPanel: React.FC = () => {
  const resizerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<{ text: string, isUser: boolean }[]>([]);

  useResizer(resizerRef, leftPanelRef);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(textarea.value);
  };

  const handleSendMessage = () => {
    if (text.trim()) {
      setMessages([...messages, { text, isUser: true }]);
      setText('');
    }
  };

  return (
    <aside className="panel left-panel"
           ref={leftPanelRef}
           style={{ width: 300 }}>
      <div className="resizer" id="resizer" ref={resizerRef} />
      { messages.length === 0 ? (
        <div className="recommendation-texts">
          <h2>Please enter the restaurant you are looking for</h2>
          <div className="recommendation-buttons">
            <button>Recommend a place for dinner with friends</button>
            <button>Recommend a restaurant with a comfortable atmosphere</button>
          </div>
        </div>
      ) : (
        <>
          <div className="chat-header">
            <h2>Chat</h2>
            <button aria-label='new chat'></button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-bubble ${message.isUser ? 'user' : 'response'}`}>
                {message.text}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="chat-input">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Please tell us the restaurant you are looking for"
          rows={1}
        />
        <button
          aria-label='search'
          onClick={handleSendMessage}
          disabled={!text.trim()}
        >
          <img src={SendFill} alt="" />
        </button>
      </div>
    </aside>
  );
};

export default LeftPanel;