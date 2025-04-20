import compression from "compression";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

export const configureCommonMiddleware = (app: Application): void => {
  // Security middleware
  app.use(helmet());

  // CORS middleware
  app.use(cors());

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use(morgan("dev"));

  // Response compression
  app.use(compression());
};
