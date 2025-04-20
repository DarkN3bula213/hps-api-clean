import http from "node:http2";

import { config } from "./ config/env";
import app from "./server";
import logger from "./utils/logger";

const port = config.get("PORT");
const env = config.get("NODE_ENV");
const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(port, () => {
      logger.info(`Server is running in ${env} mode on port ${port}`);
    });
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
