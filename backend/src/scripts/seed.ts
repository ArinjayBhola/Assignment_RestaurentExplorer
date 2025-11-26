import { connectDatabase, disconnectDatabase } from '../config/database';
import { Restaurant } from '../models/Restaurant';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const cuisines = [
  'Italian',
  'Mexican',
  'Indian',
  'Chinese',
  'Thai',
  'American',
  'Mediterranean',
  'Japanese',
  'Korean',
  'Spanish',
  'French',
  'Vietnamese',
  'Greek',
];

const tags = [
  'Cozy',
  'Family Friendly',
  'Fine Dining',
  'Quick Bites',
  'Vegan Options',
  'Outdoor Seating',
  'Live Music',
  'Chef Special',
];

const cities = ['New York', 'San Francisco', 'Austin', 'Seattle', 'Chicago'];

type RestaurantSeedInput = {
  name: string;
  description: string;
  cuisines: string[];
  tags: string[];
  rating: number;
  averageCostForTwo: number;
  imageUrl: string;
  menu: {
    name: string;
    description: string;
    price: number;
    isVegetarian: boolean;
  }[];
  location: {
    address: string;
    city: string;
  };
};

const randomFromArray = <T>(array: T[], count = 1): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const makeMenu = (seed: number): RestaurantSeedInput['menu'] => {
  return Array.from({ length: 6 }).map((_, idx) => {
    const base = seed + idx;
    return {
      name: `Signature Dish ${idx + 1}`,
      description: 'A chef-curated delicacy crafted for food lovers.',
      price: Math.round(((base % 40) + 10) * 1.2),
      isVegetarian: idx % 2 === 0,
    };
  });
};

const buildRestaurants = (count: number): RestaurantSeedInput[] => {
  return Array.from({ length: count }).map((_, index) => {
    const cuisineSelection = randomFromArray(cuisines, 2);
    const rating = Number((Math.random() * 1.5 + 3.5).toFixed(1));
    const cost = Math.round(Math.random() * 70 + 20);

    const city = cities[index % cities.length] ?? 'New York';

    return {
      name: `${cuisineSelection[0]} Haven ${index + 1}`,
      description:
        'Experience authentic flavors prepared with seasonal produce and crafted with love.',
      cuisines: cuisineSelection,
      tags: randomFromArray(tags, 3),
      rating,
      averageCostForTwo: cost,
      imageUrl: `https://picsum.photos/seed/restaurant-${index}/800/600`,
      menu: makeMenu(index),
      location: {
        address: `${Math.floor(Math.random() * 900) + 100} Culinary St.`,
        city,
      },
    };
  });
};

const seed = async (): Promise<void> => {
  await connectDatabase();
  await Restaurant.deleteMany({}).exec();
  const data = buildRestaurants(env.seededRecords);
  await Restaurant.insertMany(data);
  logger.info(`Seeded ${data.length} restaurants`);
};

seed()
  .catch((error) => {
    logger.error('Seeding failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectDatabase();
  });

