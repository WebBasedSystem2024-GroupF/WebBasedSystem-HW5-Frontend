import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import '@/styles/GoogleMap.css';

interface GoogleMapComponentProps {
  children?: React.ReactNode;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const initialCenter = {
  lat: 34.0522,
  lng: -118.2437
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ children }) => {
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [showButton, setShowButton] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    map.addListener('center_changed', () => {
      const center = map.getCenter();
      if (center) {
        setMapCenter({ lat: center.lat(), lng: center.lng() });
        setShowButton(true);
      }
    });
  }, []);

  const handleSearchAgain = () => {
    console.log('Searching again at:', mapCenter);
    setShowButton(false);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={initialCenter}
          zoom={10}
          onLoad={onLoad}
        >
          {children}
        </GoogleMap>
        {showButton && (
          <button className="search-again-button" onClick={handleSearchAgain}>
            Search Here Again
          </button>
        )}
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;