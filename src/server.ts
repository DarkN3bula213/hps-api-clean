import cors from "cors";
import express from "express";
import helmet from "helmet";

import { apiKeyValidator } from "./auth";
import { errorHandler } from "./herrors";
import { configureCommonMiddleware } from "./middleware/common";
import { errorLogger, requestLogger } from "./observibility";
import apiRouter from "./routes";
import { getMiddleware } from "./utils";

const app = express();
const _PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Observability Middleware
app.use(requestLogger);
app.use(errorLogger);

// Authentication Middle  ware
app.use(getMiddleware(apiKeyValidator));

// Common Middleware
configureCommonMiddleware(app);

// API Routes
app.use("/api", apiRouter);

// Error Handling
app.use(errorHandler);

export default app;
