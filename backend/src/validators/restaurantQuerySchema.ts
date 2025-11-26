import { z } from 'zod';

const numericField = (fallback?: number) =>
  z.preprocess((value) => {
    if (value === undefined || value === null || value === '') {
      return fallback ?? undefined;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }, z.number().optional());

export const restaurantQuerySchema = z
  .object({
    search: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .optional()
      .or(z.literal(''))
      .transform((val) => (val ? val : undefined)),
    cuisine: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .transform((value) => {
        if (!value) return undefined;
        if (Array.isArray(value)) return value.filter(Boolean);
        return value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      }),
    rating: numericField().refine(
      (value) => value === undefined || (value >= 1 && value <= 5),
      { message: 'rating must be between 1 and 5' },
    ),
    costMin: numericField()
      .transform((value) => (value === undefined ? undefined : Math.max(0, value)))
      .refine((value) => value === undefined || value >= 0, {
        message: 'costMin must be >= 0',
      }),
    costMax: numericField(),
    page: numericField(1)
      .transform((value) => value ?? 1)
      .refine((value) => value >= 1, { message: 'page must be >= 1' }),
    limit: numericField(12)
      .transform((value) => value ?? 12)
      .refine((value) => value >= 1 && value <= 50, {
        message: 'limit must be between 1 and 50',
      }),
  })
  .superRefine((data, ctx) => {
    if (
      data.costMax !== undefined &&
      data.costMin !== undefined &&
      data.costMax < data.costMin
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['costMax'],
        message: 'costMax must be greater than or equal to costMin',
      });
    }
  });
