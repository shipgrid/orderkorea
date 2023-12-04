import winston, { 
  Logger,
  format,

} from 'winston';
import { getWinsonTransport } from '@hyperdx/node-opentelemetry';

const MAX_LEVEL: string = 'info';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const logger: Logger = winston.createLogger({
  level: MAX_LEVEL,
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
  transports: [
    new winston.transports.Console(),
    getWinsonTransport(MAX_LEVEL), // append this to the existing transports
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
  ],
  rejectionHandlers: [
    new winston.transports.Console(),
  ],
});

export default logger;
