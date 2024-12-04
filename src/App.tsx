import React from 'react';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header/>
      <div className="main-content">
        <LeftPanel />
        <CenterPanel />
      </div>
    </div>
  );
};

export default App;