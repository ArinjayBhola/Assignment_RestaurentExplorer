import type { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';

export const validateRequest =
  (schema: { query?: ZodTypeAny; body?: ZodTypeAny }) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (schema.query) {
      const result = schema.query.parse(req.query);
      Object.defineProperty(req, 'query', {
        value: result,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    if (schema.body) {
      const result = schema.body.parse(req.body);
      Object.defineProperty(req, 'body', {
        value: result,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    next();
  };

