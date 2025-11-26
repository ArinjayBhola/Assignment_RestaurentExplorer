export interface RestaurantQuery {
  search?: string;
  cuisine?: string[];
  rating?: number;
  costMin?: number;
  costMax?: number;
  page: number;
  limit: number;
}

