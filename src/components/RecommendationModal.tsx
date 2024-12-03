import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import CriteriaBar from './CriteriaBar';
import ArrowIcon from '@/assets/arrow_down.svg';
import '@/styles/GoogleMap.css';

const RecommendationModal: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="modal">
      <button className="back-button">Back</button>
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
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
    </div>
  );
};

export default RecommendationModal;