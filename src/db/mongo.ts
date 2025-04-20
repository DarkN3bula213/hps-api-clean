import mongoose from "mongoose";
import logger from "../utils/logger";

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      autoIndex: true, // Don't build indexes
      dbName: "mydatabase", // Database name
      maxPoolSize: 10 // Maintain up to 10 socket connections
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
  public async connect() {
    await connectToMongo();
  }
  public async disconnect() {
    await mongoose.connection.close();
    logger.info("Disconnected from MongoDB");
  }
  public async getConnection() {
    return mongoose.connection;
  }

  public async isConnected() {
    return mongoose.connection.readyState === 1; // 1 means connected
  }
}

const db = MongoDBService.getInstance();
type DBInput = {
  db: string;
};

export default ({ db }: DBInput) => {
  const connect = () => {
    mongoose
      .connect(db, {
        autoIndex: true, // Don't build indexes
        dbName: "mydatabase", // Database name
        maxPoolSize: 10 // Maintain up to 10 socket connections
      })
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((err) => {
        console.error("Database error:", err);

        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnected", connect);
};
