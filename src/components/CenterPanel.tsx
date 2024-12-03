import React from 'react';
import Map from './Map';
import RecommendationList from './RecommendationList';

const CenterPanel: React.FC = () => {
  return (
    <main className="panel center-panel">
      <RecommendationList />
      <Map />
    </main>
  );
};

export default CenterPanel;