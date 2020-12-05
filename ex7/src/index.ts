import express from 'express';
import cors from 'cors';
import path from 'path';
import { router as productsRouter } from './routers/productsRouter';
import { router as categoriesRouter } from './routers/categoriesRouter';
import * as request_err from './error_handlers/request_err';
import { appErrorLogger, appLogger } from './loggers/loggers';
import { getConfigValue } from './config/config';
import { init } from './controllers/dbController';

const app = express();

app.use(express.json());
app.use(cors());

app.set('port', getConfigValue('APP_PORT') || 8000);

/**
 * Top level Logger
 */
app.use(appLogger);

/**
 * Main Routes
 */
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

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

/**
 * Mock Db connection using fetch node
 */
init();

app.listen(app.get('port'), () => {
  console.log('Server is up');
  console.log('port is', app.get('port'));
  console.log('env is', app.get('env'));
});

app.get('/', (req, res) => {
  res.send('in root');
});
