import { buildSearchParams } from '@/utils/queryParams';
import type {
  ApiResponse,
  Restaurant,
  RestaurantFilters,
  RestaurantsResponse,
} from '@/types/restaurant';
import { apiClient } from './apiClient';

export const fetchRestaurants = async (filters: RestaurantFilters) => {
  const params = buildSearchParams(filters);
  const { data } = await apiClient.get<ApiResponse<RestaurantsResponse>>(
    `/restaurants?${params.toString()}`,
  );
  return data.data;
};

export const fetchRestaurantById = async (id: string) => {
  const { data } = await apiClient.get<ApiResponse<Restaurant>>(
    `/restaurants/${id}`,
  );
  return data.data;
};

