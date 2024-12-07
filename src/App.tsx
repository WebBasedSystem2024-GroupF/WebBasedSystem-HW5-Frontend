import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import LeftPanel from '@/components/LeftPanel';
import CenterPanel from '@/components/CenterPanel';
import RestaurantDetail from '@/components/RestaurantDetail';
import RecommendationModal from '@/components/RecommendationModal';
import './App.css';
import PlaceSearch from '@/components/PlaceSearch';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header/>
      <div className="main-content">
        <LeftPanel/>
        <CenterPanel>
          <Router>
            <Routes>
              <Route path="/" element={<RecommendationModal />}/>
              <Route path='/search' element={<PlaceSearch />}/>
              <Route path="/restaurant/:id" element={<RestaurantDetail/>}/>
            </Routes>
          </Router>
        </CenterPanel>
      </div>
    </div>
  );
};

export default App;