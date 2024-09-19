import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { webRouter, apiRouter } from './routes';

// initialize
dotenv.config();
const app: Application = express();
const port: Number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(webRouter);
app.use('/api', apiRouter);

// listen server
app.listen(port, () => console.log(`Application running on port: ${port}`));