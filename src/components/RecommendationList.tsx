import React from 'react';
import RestaurantCard from './RestaurantCard';

const RecommendationList: React.FC = () => {
  return (
    <div className="recommendation-list">
      <RestaurantCard />
      <RestaurantCard />
      <RestaurantCard />
      {/* More RestaurantCard components */}
    </div>
  );
};

export default RecommendationList;