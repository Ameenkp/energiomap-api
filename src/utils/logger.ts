import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...rest } = info;
      const serviceName = 'energiomap-api';
      return `[${level}]: {${serviceName} , ${timestamp}} ${message}  ${JSON.stringify(rest)}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true, colors: { info: 'blue', error: 'red' } }),
        winston.format.simple()
      ),
      level: 'debug',
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
