import { config } from "./ config/env";
import { requestLogger } from "./observibility";
import app from "./server";

import http from "http";


const port = config.get("PORT");
const env = config.get("NODE_ENV");
const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(port, () => {
      requestLogger
      console.log(`Server is running in ${env} mode on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
