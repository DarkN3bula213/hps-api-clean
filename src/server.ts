import express from "express";
import cors from "cors";
import helmet from "helmet";
 
import { apiKeyValidator } from "./auth";
import { errorLogger, requestLogger } from "./observibility";
import { errorHandler } from "./herrors";
import { getMiddleware } from "./utils";

import apiRouter from "./routes";
const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(cors()); 

// Observability Middleware
app.use(requestLogger);
app.use(errorLogger);

// Authentication Middle  ware
app.use(getMiddleware(apiKeyValidator));

// API Routes
app.use("/api", apiRouter);

// Error Handling
app.use(errorHandler);


export default app;