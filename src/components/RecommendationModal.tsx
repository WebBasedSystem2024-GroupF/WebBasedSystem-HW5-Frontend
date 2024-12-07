import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const effectRan = useRef(false);

  const fetchRestaurants = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/data?page=${page}`);
      const data = await response.json();
      setRestaurants(prevRestaurants => [...prevRestaurants, ...data.data]);
    } catch (error) {
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
        // Reset the effectRan flag after 1 second
        effectRan.current = false;
      }, 800);
    }
  }, [currentPage, fetchRestaurants]);

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
            <CriteriaBar label="Ambiance" percentage={90} />
            <CriteriaBar label="Rating" percentage={80} />
            <CriteriaBar label="Distance" percentage={70} />
            <CriteriaBar label="Price Range" percentage={60} />
            {showMore ? (
              <>
                <CriteriaBar label="Cuisine" percentage={30} />
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