import React from 'react';

const RestaurantCard: React.FC = () => {
  return (
    <div className="restaurant-card">
      <img src="restaurant-thumbnail.jpg" alt="Restaurant" />
      <h3>Restaurant Name</h3>
      <p>Rating: 4.5</p>
      <p>Distance: 1.2 km</p>
      <p>Price Range: $$</p>
      <p>Recommended for: Great ambiance</p>
      <button>More Info</button>
    </div>
  );
};

export default RestaurantCard;