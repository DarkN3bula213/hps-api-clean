import { Request, Response, NextFunction } from "express";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
  ],
});

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
}

// Middleware to log errors
export function errorLogger(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error("Error occurred", {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    apiKey: (req.headers["x-api-key"] as string) || "unknown",
  });

  next(err);
}

// General purpose logger
const loggerInstance = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/general-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "7d",
    }),
  ],
});


export default loggerInstance;