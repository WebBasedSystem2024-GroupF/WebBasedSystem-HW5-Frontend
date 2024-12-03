import React, { useRef } from 'react';
import SendFill from '@/assets/send_fill.svg';
import '@/styles/LeftPanel.css';
import useResizer from '../hooks/useResizer';

const LeftPanel: React.FC = () => {
  const resizerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  useResizer(resizerRef, leftPanelRef);

  return (
    <aside className="panel left-panel"
           ref={leftPanelRef}
           style={{ width: 300 }}>
      <div className="resizer" id="resizer" ref={resizerRef} />
      <div className='recommendation-texts'>
        <h2>Please enter the restaurant you are looking for</h2>
        <div className="recommendation-buttons">
          <button>Recommend a place for dinner with friends</button>
          <button>Recommend a restaurant with a comfortable atmosphere</button>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Please tell us the restaurant you are looking for" />
        <button aria-label='search'>
          <img src={SendFill} alt="" />
        </button>
      </div>
    </aside>
  );
};

export default LeftPanel;