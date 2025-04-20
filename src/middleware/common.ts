import express,  { type  Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

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
