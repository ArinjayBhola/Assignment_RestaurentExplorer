import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let details: string | string[] | null = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    details = err.issues.map((issue) => issue.message);
  } else if ('statusCode' in err) {
    statusCode = Number((err as AppError).statusCode) || 500;
    message = err.message;
  }

  logger.error(message, err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
  });
};

