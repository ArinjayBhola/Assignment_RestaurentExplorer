export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export const DEFAULT_PAGE_SIZE = 12;

export const CUISINE_OPTIONS = [
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

export const RATING_OPTIONS = [
  { label: '4.0+', value: 4 },
  { label: '3.0+', value: 3 },
];

export const COST_LIMITS = {
  min: 10,
  max: 150,
};

