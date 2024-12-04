import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import '@/styles/GoogleMap.css';

interface GoogleMapComponentProps {
  children?: React.ReactNode;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 34.0522,
  lng: -118.2437
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({children}) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
        {children}
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;