import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/RestaurantCard.css';

interface RestaurantCardProps {
  name: string;
  address: string;
  avgRating: number;
  category: string;
  id: string; // Add an id prop for navigation
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, address, avgRating, category, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div className="image-container">
        <img src="restaurant.png" alt="Restaurant" />
      </div>
      <h4>{name}</h4>
      <p>Address: {address}</p>
      <p>Rating: {avgRating}</p>
      {/*<p>Category: {category}</p>*/}
    </div>
  );
};

export default RestaurantCard;