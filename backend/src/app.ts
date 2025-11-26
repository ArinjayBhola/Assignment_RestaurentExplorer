import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import restaurantRoutes from './routes/restaurantRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(',') ?? 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

