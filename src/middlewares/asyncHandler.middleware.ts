import { Request, Response, NextFunction } from "express";

/**
 * Wraps async route handlers to catch errors and forward them to Express error handling middleware.
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };