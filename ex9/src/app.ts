import { mongoConnect } from './controllers/dbController';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { router as productsRouter } from './routers/productsRouter';
import { router as categoriesRouter } from './routers/categoriesRouter';
import * as request_err from './error_handlers/request_err';
import { appErrorLogger, appLogger } from './loggers/loggers';

export const app = express();

app.use(express.json());
app.use(cors());

/**
 * DB Connection
 **/
async function initDb(): Promise<void> {
  await mongoConnect();
}

initDb();

/**
 * Top level Logger
 */
app.use(appLogger);

/**
 * Main Routes
 */
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

app.get('/', (req, res) => {
  res.send('in root');
});

/**
 * Static Serving
 */
app.use('/static', express.static(path.join(__dirname, 'static')));

/**
 * Top level Error Logger
 */
app.use(appErrorLogger);

/**
 * Custom Error handlers
 */
app.use(request_err.id_err);
app.use(request_err.name_err);
