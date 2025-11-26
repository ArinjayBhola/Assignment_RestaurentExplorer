import { useMemo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchRestaurants } from '@/services/restaurantService';
import type { RestaurantFilters } from '@/types/restaurant';
import { buildSearchParams } from '@/utils/queryParams';

export const useRestaurants = (filters: RestaurantFilters) => {
  const cacheKey = useMemo(
    () => buildSearchParams(filters).toString(),
    [filters],
  );

  return useQuery({
    queryKey: ['restaurants', cacheKey],
    queryFn: () => fetchRestaurants(filters),
    placeholderData: keepPreviousData,
  });
};

