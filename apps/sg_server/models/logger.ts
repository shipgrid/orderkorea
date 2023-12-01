import winston, { Logger } from 'winston';
import { getWinsonTransport } from '@hyperdx/node-opentelemetry';

const MAX_LEVEL: string = 'info';

const logger: Logger = winston.createLogger({
  level: MAX_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    getWinsonTransport(MAX_LEVEL), // append this to the existing transports
  ],
});

export default logger;
