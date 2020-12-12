import winston from 'winston';
import expressWinston from 'express-winston';

const topLevelConfig = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
};

/**
 * Top level Logger
 */
export const appLogger = expressWinston.logger(topLevelConfig);

/**
 * Top level Error Logger
 */
export const appErrorLogger = expressWinston.errorLogger(topLevelConfig);

/**
 * Logger Factory
 * @param name
 */
export const createLogger = (name: string): winston.Logger =>
  winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    defaultMeta: {
      name,
    },
  });

/**
 * Custom Loggers
 */
export const productLogger = createLogger('Products Logger');
export const categoriesLogger = createLogger('Categories Logger');
