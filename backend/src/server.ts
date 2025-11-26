import http from 'http';
import app from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { logger } from './utils/logger';

const server = http.createServer(app);

const start = async (): Promise<void> => {
  try {
    await connectDatabase();
    server.listen(env.port, () => {
      logger.info(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

void start();

