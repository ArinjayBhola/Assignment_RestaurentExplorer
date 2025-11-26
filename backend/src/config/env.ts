import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI ?? '',
  seededRecords: Number(process.env.SEED_RECORDS) || 200,
};

if (!env.mongoUri && process.env.NODE_ENV !== 'test') {
  console.warn(
    'Warning: MONGO_URI is not set. The API will fail to connect to MongoDB.',
  );
}

