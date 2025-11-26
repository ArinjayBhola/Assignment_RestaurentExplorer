import { Restaurant } from '../models/Restaurant';
import type { RestaurantDocument } from '../models/Restaurant';
import type { RestaurantQuery } from '../types/restaurant';
import { buildRestaurantFilters } from '../utils/filterBuilder';
import { AppError } from '../utils/appError';

interface PaginatedRestaurants {
  items: RestaurantDocument[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const getRestaurants = async (
  query: RestaurantQuery,
): Promise<PaginatedRestaurants> => {
  const filters = buildRestaurantFilters(query);
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    Restaurant.find(filters)
      .sort({ rating: -1, name: 1 })
      .skip(skip)
      .limit(query.limit)
      .lean<RestaurantDocument[]>(),
    Restaurant.countDocuments(filters),
  ]);

  return {
    items,
    pagination: {
      total,
      page: query.page,
      limit: query.limit,
      pages: Math.ceil(total / query.limit),
    },
  };
};

export const getRestaurantById = async (id: string): Promise<RestaurantDocument> => {
  const restaurant = await Restaurant.findById(id).lean<RestaurantDocument | null>();
  if (!restaurant) {
    throw new AppError('Restaurant not found', 404);
  }
  return restaurant;
};

