import React from 'react';
import GoogleMapComponent from './GoogleMap';

interface CenterPanelProps {
  children: React.ReactNode;
}

const CenterPanel: React.FC<CenterPanelProps> = ({children}) => {
  return (
    <main className="panel center-panel">
      <GoogleMapComponent>
        {children}
      </GoogleMapComponent>
    </main>
  );
};

export default CenterPanel;