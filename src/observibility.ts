import { NextFunction, Request, Response } from "express";

import logger from "./utils/logger";

// Middleware to log requests and response metrics
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info("Request completed", {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      apiKey: (req.headers["x-api-key"] as string) || "unknown",
    });
  });

  next();
  return;
}

// Middleware to log errors
export function errorLogger(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error("Error occurred", {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    apiKey: (req.headers["x-api-key"] as string) || "unknown",
  });

  next(err);
}
