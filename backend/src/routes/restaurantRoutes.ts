import { Router } from 'express';
import { listRestaurants, fetchRestaurant } from '../controllers/restaurantController';
import { validateRequest } from '../middlewares/validateRequest';
import { restaurantQuerySchema } from '../validators/restaurantQuerySchema';

const router = Router();

router.get('/', validateRequest({ query: restaurantQuerySchema }), listRestaurants);
router.get('/:id', fetchRestaurant);

export default router;

