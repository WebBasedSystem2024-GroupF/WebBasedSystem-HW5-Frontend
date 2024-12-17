import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MarkerF} from '@react-google-maps/api';
import Header from '@/components/Header';
import LeftPanel from '@/components/LeftPanel';
import GoogleMapComponent from '@/components/GoogleMap';
import RestaurantDetail from '@/components/RestaurantDetail';
import RecommendationModal from '@/components/RecommendationModal';
import {useRecommendations} from '@/hooks/useRecommendations';
import {Bounds, getFixedBounds} from '@/utils/bounds';
import './App.css';

const App: React.FC = () => {
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [scores, setScores] = useState<string>('0,0,0,0,0');
  const recommendations = useRecommendations(bounds, scores);

  const handleSearchAgain = (newBounds: google.maps.LatLngBounds | undefined) => {
    setBounds(getFixedBounds(newBounds));
  };


  return (
    <div className="app">
      <Header/>
      <div className="main-content">
        <Router>
          <LeftPanel setScores={setScores}/>
          <main className="panel center-panel">
            <GoogleMapComponent onSearchAgain={handleSearchAgain}>
              <Routes>
                <Route path="/" element={<></>}/>
                <Route path="/search" element={<RecommendationModal recommendations={recommendations}/>}/>
                <Route path="/restaurant/:id" element={<RestaurantDetail/>}/>
              </Routes>

              {recommendations.data?.pages.map((page, i) => (
                page.restaurants.map((restaurant) => (
                  <MarkerF
                    key={restaurant.gmap_id}
                    position={{lat: restaurant.latitude, lng: restaurant.longitude}}
                    title={restaurant.name}
                    onClick={() => window.location.href = `/restaurant/${restaurant.gmap_id}`}
                  />
                ))
              ))}
            </GoogleMapComponent>
          </main>
        </Router>
      </div>
    </div>
  );
};

export default App;