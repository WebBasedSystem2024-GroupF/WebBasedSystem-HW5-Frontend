import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from '@/components/Header';
import LeftPanel from '@/components/LeftPanel';
import GoogleMapComponent from '@/components/GoogleMap';
import RestaurantDetail from '@/components/RestaurantDetail';
import RecommendationModal from '@/components/RecommendationModal';
import './App.css';

const App: React.FC = () => {
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const setMapRef = (ref: google.maps.Map | null) => {
    mapRef.current = ref;
  }

  return (
    <div className="app">
      <Header/>
      <div className="main-content">
        <Router>
          <LeftPanel/>
          <main className="panel center-panel">
            <GoogleMapComponent setMapRef={setMapRef}>
              <Routes>
                <Route path="/" element={<></>}/>
                <Route path="/search" element={<RecommendationModal mapRef={mapRef}/>}/>
                <Route path="/restaurant/:id" element={<RestaurantDetail/>}/>
              </Routes>
            </GoogleMapComponent>
          </main>
        </Router>
      </div>
    </div>
  );
};

export default App;