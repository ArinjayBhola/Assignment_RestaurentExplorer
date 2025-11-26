import { describe, it, expect } from 'vitest';
import { buildRestaurantFilters } from './filterBuilder';

describe('buildRestaurantFilters', () => {
  it('creates text filter for search term', () => {
    const filters = buildRestaurantFilters({
      search: 'pizza',
      page: 1,
      limit: 10,
    });

    expect(filters.$text?.$search).toBe('pizza');
  });

  it('applies cuisine, rating and cost filters', () => {
    const filters = buildRestaurantFilters({
      cuisine: ['Italian', 'Mexican'],
      rating: 4,
      costMin: 20,
      costMax: 80,
      page: 1,
      limit: 10,
    });

    expect(filters.cuisines).toEqual({ $all: ['Italian', 'Mexican'] });
    expect(filters.rating).toEqual({ $gte: 4 });
    expect(filters.averageCostForTwo).toEqual({ $gte: 20, $lte: 80 });
  });
});

