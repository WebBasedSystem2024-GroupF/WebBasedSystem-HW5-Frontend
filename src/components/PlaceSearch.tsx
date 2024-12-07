import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [placeId, setPlaceId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK' && data.candidates.length > 0) {
        setPlaceId(data.candidates[0].place_id);
      } else {
        console.error('No place found or invalid request:', data.error_message);
      }
    } catch (error) {
      console.error('Error fetching place ID:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <button className="back-button" onClick={() => navigate('/')}>Back</button>
      </div>

      <div className="modal-body">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter place name or address"
        />
        <button onClick={handleSearch}>Search</button>
        {placeId && <p>Place ID: {placeId}</p>}
      </div>
    </div>
  );
};

export default PlaceSearch;