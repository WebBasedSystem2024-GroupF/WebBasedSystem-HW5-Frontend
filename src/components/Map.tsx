import React from 'react';
import GoogleMapComponent from './GoogleMap';

const Map: React.FC = () => {
  return (
    <div className="map-container">
      <GoogleMapComponent />
    </div>
  );
};

export default Map;