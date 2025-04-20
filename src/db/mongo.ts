import { MongoClient } from "mongodb";
import * as mongoose from "mongoose";

import logger from "../utils/logger";

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

export const connectToMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI, {
      autoIndex: true, // Don't build indexes
      dbName: "mydatabase", // Database name
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });

    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

class MongoDBService {
  private static instance: MongoDBService;
  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService();
    }
    return MongoDBService.instance;
  }
  public async connect(): Promise<void> {
    await connectToMongo();
  }
  public async disconnect(): Promise<void> {
    await mongoose.connection.close();
    logger.info("Disconnected from MongoDB");
  }
  public async getConnection(): Promise<mongoose.Connection> {
    return mongoose.connection;
  }

  public async isConnected(): Promise<boolean> {
    return mongoose.connection.readyState === 1; // 1 means connected
  }
}

const _db = MongoDBService.getInstance();
type DBInput = {
  db: string;
};

export default ({ db }: DBInput) => {
  const connect = () => {
    mongoose
      .connect(db, {
        autoIndex: true, // Don't build indexes
        dbName: "mydatabase", // Database name
        maxPoolSize: 10, // Maintain up to 10 socket connections
      })
      .then(() => {
        logger.info(`Successfully connected to ${db}`);
      })
      .catch((err) => {
        logger.error("Database error:", err);

        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnected", connect);
};

const DB = async (): Promise<{
  mongoose: typeof mongoose;
  mongoClient: MongoClient;
}> => {
  try {
    // Connect Mongoose
    const conn = await mongoose.connect(mongoURI, {
      autoIndex: true,
    });
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Connect MongoDB Client (for Better Auth)
    const mongoClient = new MongoClient(mongoURI);
    await mongoClient.connect();
    logger.info("✅ MongoDB Client Connected for Better Auth");

    return { mongoose, mongoClient };
  } catch (err: any) {
    logger.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

export { DB };
