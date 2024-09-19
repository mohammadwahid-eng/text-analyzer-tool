import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { webRouter, apiRouter } from './routes';
import * as database from './config/database';

// initialize
dotenv.config();
const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// database connection
database.connect();

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