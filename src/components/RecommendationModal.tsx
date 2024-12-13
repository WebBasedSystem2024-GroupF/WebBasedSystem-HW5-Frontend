import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecommendations } from '@/hooks/useRecommendations';
import RestaurantCard from './RestaurantCard';
import '@/styles/GoogleMap.css';
import CriteriaList from '@/components/CriteriaList';

interface RecommendationModalProps {
  mapRef: React.RefObject<google.maps.Map | null>;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ mapRef }) => {
  const location = useLocation();
  const query = new URLSearchParams(window.location.search);
  const scores = query.get('topic') ?? '0,0,0,0,0';

  const bounds = mapRef.current?.getBounds() ?? null;
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecommendations(bounds, scores);

  useEffect(() => {
    // Reset the query when the location changes
  }, [location.pathname]);

  useEffect(() => {
    if (mapRef.current && data) {
      data.pages.forEach(page => {
        page.restaurants.forEach(restaurant => {
          new google.maps.Marker({
            position: { lat: restaurant.latitude, lng: restaurant.longitude },
            map: mapRef.current,
            title: restaurant.name,
          });
        });
      });
    }
  }, [data, mapRef]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - 10 <= clientHeight && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="modal" onScroll={handleScroll}>
      <div className="modal-header">
        <h2>Recommendations</h2>
      </div>

      <div className="modal-body">
        <h3>Recommendations</h3>

        <CriteriaList />

        <div className="recommendation-list">
          <h3>Top Recommendations</h3>
          {isLoading && <div>Loading...</div>}
          {error && <div>{error.message}</div>}
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.restaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.gmap_id}
                  id={restaurant.gmap_id}
                  name={restaurant.name}
                  latitude={restaurant.latitude}
                  longitude={restaurant.longitude}
                />
              ))}
            </React.Fragment>
          ))}
          {isFetchingNextPage && <div>Loading more...</div>}
        </div>
      </div>
    </div>
  );
};

export default RecommendationModal;