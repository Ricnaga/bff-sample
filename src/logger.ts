import winston from 'winston';

import { logsPath, Environment } from './config';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
});

if (process.env.ENV === Environment.Development) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.label({ label: 'Log' }),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
    }),
  );
} else {
  logger.add(
    new winston.transports.File({
      filename: logsPath('error.log'),
      level: 'error',
    }),
  );
  logger.add(new winston.transports.File({ filename: logsPath('logs.log') }));
}

export const log = (
  message: string,
  type?: string,
  metadata?: Record<string, unknown>,
) => logger.log(type || 'info', message, metadata);

export const logInfo =
  <L>(...params: unknown[]) =>
  (info: L) =>
    Promise.resolve()
      .then(() => logger.info(info as unknown as string, { metadata: params }))
      .then(() => info);

export const logError =
  <L extends Error>(...params: unknown[]) =>
  (error: L) =>
    Promise.resolve()
      .then(() =>
        logger.error(error.message, {
          metadata: params,
          name: error.name,
          stacktrace: error.stack,
        }),
      )
      .then(() => Promise.reject(error));

export const logWarning =
  <L extends string>(...params: unknown[]) =>
  (warn: L) =>
    Promise.resolve()
      .then(() => logger.warning(warn, { metadata: params }))
      .then(() => warn);
