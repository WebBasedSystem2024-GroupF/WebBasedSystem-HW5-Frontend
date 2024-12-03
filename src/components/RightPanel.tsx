import React from 'react';

const RightPanel: React.FC = () => {
  return (
    <aside className="panel right-panel">
      <div className="resizer" id="resizer"/>

      <h2>Restaurant Details</h2>
      <div className="restaurant-details">
        <h3>Restaurant Name</h3>
        <img src="restaurant.png" alt="Restaurant"/>
        <p>Summary of detailed reviews</p>
        <h4>Popular Menu</h4>
        <p>Menu details</p>
        <h4>Characteristics by Context</h4>
        <p>Graph showing changes by time/weather</p>
      </div>
    </aside>
  );
};

export default RightPanel;