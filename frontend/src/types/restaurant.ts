export interface MenuItem {
  name: string;
  description: string;
  price: number;
  isVegetarian: boolean;
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  cuisines: string[];
  tags: string[];
  rating: number;
  averageCostForTwo: number;
  imageUrl: string;
  menu: MenuItem[];
  location: {
    address: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantFilters {
  search?: string;
  cuisine: string[];
  rating?: number;
  costMin?: number;
  costMax?: number;
  page: number;
  limit: number;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface RestaurantsResponse {
  items: Restaurant[];
  pagination: PaginationData;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
