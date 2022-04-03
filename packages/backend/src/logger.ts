import pino from 'pino';

const development = process.env.NODE_ENV === 'development';

export const logger = pino({
  prettyPrint: development
    ? {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      }
    : false,
});
