import type { Request, Response } from 'express';
import { getRestaurantById, getRestaurants } from '../services/restaurantService';
import { asyncHandler } from '../utils/asyncHandler';
import { RestaurantQuery } from '../types/restaurant';

export const listRestaurants = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as RestaurantQuery;
  const data = await getRestaurants(query);
  res.json({ success: true, data });
});

export const fetchRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const restaurant = await getRestaurantById(id);
  res.json({ success: true, data: restaurant });
});

