import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface RestaurantDetailProps {
  place_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  avg_rating: number;
}

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantDetailProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`/place/details/json?place_id=${id}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
        const data = await response.json();
        setRestaurant({
          place_id: id ?? '',
          name: data.result.name || '',
          address: data.result.formatted_address || '',
          latitude: data.result.geometry?.location?.lat || 0,
          longitude: data.result.geometry?.location?.lng || 0,
          category: data.result.types?.[0] || '',
          avg_rating: data.result.rating || 0,
        });
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  return (
    <div className="modal">
      <div className="modal-header">
        <button className="back-button" onClick={() => navigate('/')}>Back</button>
      </div>

      <div className="modal-body">
        {!restaurant ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2>{restaurant.name}</h2>
            <p>Address: {restaurant.address}</p>
            <p>Rating: {restaurant.avg_rating}</p>
            <p>Category: {restaurant.category}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;