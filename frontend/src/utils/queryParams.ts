import { DEFAULT_PAGE_SIZE } from '@/config';
import type { RestaurantFilters } from '@/types/restaurant';

const parseNumber = (value: string | null, fallback?: number) => {
  if (value === null || value === '') return fallback;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const getDefaultFilters = (): RestaurantFilters => ({
  search: undefined,
  cuisine: [],
  rating: undefined,
  costMin: undefined,
  costMax: undefined,
  page: 1,
  limit: DEFAULT_PAGE_SIZE,
});

export const parseFiltersFromParams = (
  params: URLSearchParams,
): RestaurantFilters => {
  const base = getDefaultFilters();
  const cuisines = params.getAll('cuisine').filter(Boolean);
  return {
    ...base,
    search: params.get('search') ?? undefined,
    cuisine: cuisines,
    rating: parseNumber(params.get('rating')),
    costMin: parseNumber(params.get('costMin')),
    costMax: parseNumber(params.get('costMax')),
    page: parseNumber(params.get('page'), 1) ?? 1,
    limit: parseNumber(params.get('limit'), DEFAULT_PAGE_SIZE) ?? DEFAULT_PAGE_SIZE,
  };
};

export const buildSearchParams = (filters: RestaurantFilters) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  filters.cuisine.forEach((item) => params.append('cuisine', item));
  if (filters.rating) params.set('rating', String(filters.rating));
  if (typeof filters.costMin === 'number') {
    params.set('costMin', String(filters.costMin));
  }
  if (typeof filters.costMax === 'number') {
    params.set('costMax', String(filters.costMax));
  }
  params.set('page', String(filters.page));
  params.set('limit', String(filters.limit));
  return params;
};

export const applyFilterUpdates = (
  current: RestaurantFilters,
  updates: Partial<RestaurantFilters>,
): RestaurantFilters => {
  const merged: RestaurantFilters = {
    ...current,
    ...updates,
    cuisine: updates.cuisine ?? current.cuisine,
  };

  if (!merged.search) {
    merged.search = undefined;
  }
  if (!merged.rating) {
    merged.rating = undefined;
  }
  merged.cuisine = merged.cuisine.filter(Boolean);

  if (
    typeof merged.costMin === 'number' &&
    typeof merged.costMax === 'number' &&
    merged.costMax < merged.costMin
  ) {
    merged.costMax = merged.costMin;
  }

  return merged;
};

