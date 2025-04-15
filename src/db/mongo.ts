import mongoose from 'mongoose';
import logger from '../observibility';

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      autoIndex: true, // Don't build indexes
      dbName: 'mydatabase', // Database name
      maxPoolSize: 10, // Maintain up to 10 socket connections

    });
     
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};