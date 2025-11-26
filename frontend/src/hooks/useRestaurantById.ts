import { useQuery } from '@tanstack/react-query';
import { fetchRestaurantById } from '@/services/restaurantService';

export const useRestaurantById = (id?: string) =>
  useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => fetchRestaurantById(id as string),
    enabled: Boolean(id),
  });

