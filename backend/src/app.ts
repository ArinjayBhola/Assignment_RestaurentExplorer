import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import restaurantRoutes from './routes/restaurantRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL?.split(',') ?? 'http://localhost:5173',
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: process.env.CLIENT_URL?.split(',') });
});

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
