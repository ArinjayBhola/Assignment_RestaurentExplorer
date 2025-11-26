import mongoose from 'mongoose';
import { env } from './env';

mongoose.set('strictQuery', true);

export const connectDatabase = async (): Promise<typeof mongoose.connection> => {
  if (!env.mongoUri) {
    throw new Error('Missing MONGO_URI in environment variables');
  }

  await mongoose.connect(env.mongoUri);
  return mongoose.connection;
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
};

