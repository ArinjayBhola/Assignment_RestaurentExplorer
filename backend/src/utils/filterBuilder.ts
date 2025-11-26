import type { FilterQuery } from 'mongoose';
import type { RestaurantDocument } from '../models/Restaurant';
import type { RestaurantQuery } from '../types/restaurant';

export const buildRestaurantFilters = (
  query: RestaurantQuery,
): FilterQuery<RestaurantDocument> => {
  const filters: FilterQuery<RestaurantDocument> = {};

  if (query.search) {
    filters.$text = { $search: query.search };
  }

  if (query.cuisine && query.cuisine.length > 0) {
    filters.cuisines = { $all: query.cuisine };
  }

  if (query.rating) {
    filters.rating = { $gte: query.rating };
  }

  if (query.costMin !== undefined || query.costMax !== undefined) {
    filters.averageCostForTwo = {};

    if (query.costMin !== undefined) {
      filters.averageCostForTwo.$gte = query.costMin;
    }

    if (query.costMax !== undefined) {
      filters.averageCostForTwo.$lte = query.costMax;
    }
  }

  return filters;
};

