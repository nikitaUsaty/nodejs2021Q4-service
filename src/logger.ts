import Pino from 'pino';

// const pino = require('pino');
const TransportMultiOptions = require('pino');
const transport = Pino.transport(<typeof TransportMultiOptions>{
  targets: [
    {
      target: 'pino/file',
      level: 'error',
      options: { destination: './logs/error.txt', mkdir: true, colorize: true },
    },
    {
      target: 'pino/file',
      level: 'info',
      options: {
        destination: './logs/logging.txt',
        mkdir: true,
        colorize: true,
        translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      },
    },
  ],
});

export const logger = Pino(transport);

export default logger;
