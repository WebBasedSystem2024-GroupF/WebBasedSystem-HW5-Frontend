import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useRestaurantDetails} from '@/hooks/useRestaurantDetails';
import '@/styles/RestaurantCard.css';

interface RestaurantCardProps {
  name: string;
  latitude: number;
  longitude: number;
  id: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({name, id, latitude, longitude}) => {
  const navigate = useNavigate();
  const {data, isLoading, error} = useRestaurantDetails(name, latitude, longitude);

  const handleClick = () => {
    navigate(`/restaurant/${id}?name=${name}&lat=${latitude}&lng=${longitude}`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div className="image-container">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error loading details</div>}
        {!isLoading && !error && data?.imageUrl ? (
          <img src={data.imageUrl} alt="Restaurant image"/>
        ) : (
          <img src="restaurant.png" alt="Restaurant image"/>
        )}
      </div>
      <h4>{name}</h4>
      {isLoading ?
        (
          <p>Loading...</p>
        ) : (
          <>
            <p>Address: {data.formatted_address}</p>
            <p>Rating: {data.rating?.toFixed(1) ?? 'unknown'}</p>
          </>
        )}
      {/*<p>Category: {category}</p>*/}
    </div>
  );
};

export default RestaurantCard;