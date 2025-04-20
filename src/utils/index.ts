import type { NextFunction, Request, Response } from "express";

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type MiddlewareFactory = (options?: unknown) => MiddlewareFunction;

export interface MiddlewareError extends Error {
  statusCode?: number;
  code?: string;
}

export const getMiddleware = (middlewareFn: MiddlewareFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(middlewareFn(req, res, next));
    } catch (error) {
      const middlewareError = error as MiddlewareError;
      next({
        message: middlewareError.message || "Internal Server Error",
        statusCode: middlewareError.statusCode || 500,
        code: middlewareError.code || "INTERNAL_SERVER_ERROR",
      });
    }
  };
};

// Example usage with async middleware
export const withAsync = (fn: MiddlewareFunction): MiddlewareFunction => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
