import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import '@/styles/GoogleMap.css';

interface GoogleMapComponentProps {
  children?: React.ReactNode;
  setMapRef: (ref: google.maps.Map | null) => void;
  searchAgain: () => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const initialCenter = {
  lat: 34.0522,
  lng: -118.2437
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ children, setMapRef, searchAgain }) => {
  const [showButton, setShowButton] = useState(false);
  const mapInstance = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
    mapInstance.current = map;
    map.addListener('center_changed', () => {
      const center = map.getCenter();
      if (center) {
        setShowButton(true);
      }
    });
  }, []);

  const handleSearchAgain = () => {
    searchAgain();
    setShowButton(false);
  };

  // useEffect(() => {
  //   if (mapInstance.current && data) {
  //     data.pages.forEach(page => {
  //       page.restaurants.forEach(restaurant => {
  //         new google.maps.Marker({
  //           position: { lat: restaurant.latitude, lng: restaurant.longitude },
  //           map: mapInstance.current,
  //           title: restaurant.name,
  //         });
  //       });
  //     });
  //   }
  // }, [data]);

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
        {/*{isLoading && <div>Loading...</div>}*/}
        {/*{error && <div>Error loading map data</div>}*/}
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;