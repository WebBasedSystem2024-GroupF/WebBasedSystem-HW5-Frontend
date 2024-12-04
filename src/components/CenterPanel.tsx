import React from 'react';
import GoogleMapComponent from './GoogleMap';
import RecommendationModal from './RecommendationModal';

const CenterPanel: React.FC = () => {
  return (
    <main className="panel center-panel">
      <GoogleMapComponent>
        <RecommendationModal />
      </GoogleMapComponent>
    </main>
  );
};

export default CenterPanel;