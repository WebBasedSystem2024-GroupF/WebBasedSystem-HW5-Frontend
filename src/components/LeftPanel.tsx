import React, { useRef, useState } from 'react';
import useResizer from '../hooks/useResizer';
import SendFill from '@/assets/send_fill.svg';
import Refresh from '@/assets/refresh.svg';
import '@/styles/LeftPanel.css';

const recommendationPrompt = [
  'Recommend a place for dinner with friends',
  'Recommend a restaurant with a comfortable atmosphere',
  'Recommend a place for a romantic date',
  'Recommend a place for a business meeting',
  'Recommend a place for a family dinner',
  'Recommend a place for a birthday party',
  'Recommend a place for a wedding anniversary',
  'Recommend a place for a graduation party',
  'Recommend a place for a baby shower',
  'Recommend a place for a bridal shower',
];

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
      setMessages([...messages, { text, isUser: true }, { text: 'I am a bot', isUser: false }]);
      setText('');
    }
  };

  const clickRecommendation = (text: string) => {
    setMessages([...messages, { text, isUser: true }, { text: 'I am a bot', isUser: false }]);
  }

  return (
    <aside className="panel left-panel"
           ref={leftPanelRef}
           style={{ width: 300 }}>
      <div className="resizer" id="resizer" ref={resizerRef} />
      { messages.length === 0 ? (
        <div className="recommendation-texts">
          <h2>Please enter the restaurant you are looking for</h2>
          <div className="recommendation-buttons">
            {recommendationPrompt.slice(0, 2).map((text, index) => (
              <button key={index} onClick={() => clickRecommendation(text)}>
                {text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="chat-header">
            <h2>Chat</h2>
            <button className='img_btn' aria-label='new chat' title='new chat'>
              <img src={Refresh} alt="" />
            </button>
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