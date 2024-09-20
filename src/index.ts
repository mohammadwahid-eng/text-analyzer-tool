import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import path from 'path';
import { webRouter, apiRouter } from './routes';
import * as database from './config/database';

// initialize
dotenv.config();
const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// database connection
database.connect();

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(rateLimit({ windowMs: 1 * 60 * 1000, limit: 100 })); // 100 requests / min

// routes
app.use(webRouter);
app.use('/api', apiRouter);

// listen server
app.listen(port, () => console.log(`Application running on port: ${port}`));