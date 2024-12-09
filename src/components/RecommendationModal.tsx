import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import CriteriaBar from './CriteriaBar';
import ArrowIcon from '@/assets/arrow_down.svg';
import '@/styles/GoogleMap.css';

interface Restaurant {
  gmap_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  avg_rating: number;
}

const RecommendationModal: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const effectRan = useRef(false);
  const location = useLocation();

  const fetchRestaurants = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/data?page=${page}`);
      const data = await response.json();
      if (data.data.length === 0 && page === 1) {
        setError('No items found.');
      } else {
        setRestaurants(prevRestaurants => [...prevRestaurants, ...data.data]);
      }
    } catch (error) {
      setError('An error occurred while fetching the data.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!effectRan.current) {
      fetchRestaurants(currentPage);
      effectRan.current = true;

      setTimeout(() => {
        effectRan.current = false;
      }, 800);
    }
  }, [currentPage, fetchRestaurants]);

  useEffect(() => {
    setRestaurants([]);
    setCurrentPage(1);
    fetchRestaurants(1);
  }, [location.pathname, fetchRestaurants]);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - 10 <= clientHeight && !loading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="modal" onScroll={handleScroll}>
      <div className="modal-header">
        <button className="back-button">Back</button>
      </div>

      <div className="modal-body">
        <h3>Recommendations</h3>

        <div className="search-criteria">
          <p>We searched based on these criteria:</p>
          <div className="criteria-details">
            <CriteriaBar label="Waiting Time and Service" percentage={90} />
            <CriteriaBar label="Price and Freshness" percentage={80} />
            <CriteriaBar label="Family-Friendly Dining" percentage={70} />
            <CriteriaBar label="Service Quality and Drinks" percentage={60} />
            <CriteriaBar label="Friendly Staff and Cleanliness" percentage={30} />
            {showMore ? (
              <>
                <CriteriaBar label="Wait Time" percentage={20} />
                <CriteriaBar label="Service" percentage={15} />
              </>
            ) : (
              <div className="gradient-overlay"></div>
            )}
          </div>
          <button className="toggle-button" onClick={handleToggle}
                  aria-label={showMore ? 'Show Less' : 'Show More'}>
            <img src={ArrowIcon} style={{transform: `rotate(${showMore ? 180 : 0}deg)`}} alt="Toggle More Criteria" />
          </button>
        </div>
        <div className="recommendation-list">
          <h3>Top Recommendations</h3>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {!loading && !error && restaurants.length === 0 && <div>No items found.</div>}
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.gmap_id}
              id={restaurant.gmap_id}
              name={restaurant.name}
              address={restaurant.address}
              avgRating={restaurant.avg_rating}
              category={restaurant.category}
            />
          ))}
          {loading && <div>Loading more...</div>}
        </div>
      </div>
    </div>
  );
};

export default RecommendationModal;