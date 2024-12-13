import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';

interface Restaurant {
  gmap_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  avg_rating: number;
}

interface RecommendationResponse {
  restaurants: Restaurant[];
  nextPage: number;
}

const fetchRecommendations = async ({ pageParam = 1, queryKey }: QueryFunctionContext<[string, google.maps.LatLngBounds | null, string]>) => {
  const [_, bounds, scores] = queryKey;
  const startLat = bounds?.getSouthWest().lat() ?? 0;
  const startLng = bounds?.getSouthWest().lng() ?? 0;
  const endLat = bounds?.getNorthEast().lat() ?? 0;
  const endLng = bounds?.getNorthEast().lng() ?? 0;

  const url = `/api/restaurants?page=${pageParam}&start_lat=${startLat}&start_lng=${startLng}&end_lat=${endLat}&end_lng=${endLng}&topic=${scores}`;
  const response = await fetch(url);
  const data = await response.json();

  return { restaurants: data.restaurants, nextPage: pageParam as number + 1 } as RecommendationResponse;
};

export const useRecommendations = (bounds: google.maps.LatLngBounds | null, scores: string) => {
  return useInfiniteQuery<RecommendationResponse, Error>({
    queryKey: ['recommendations', bounds, scores],
    queryFn: fetchRecommendations as any,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5000, // Adjust the stale time as needed
    initialPageParam: 1, // Add initialPageParam
  });
};