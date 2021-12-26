import { app } from './logger';

const fastify = require('fastify')({
  logger: {
    prettyPrint: true,
    level: 'info',
    file: './file.txt',
  },
});

const { PORT } = require('./common/config');

fastify.register(require('./resources/users/user.router'));

fastify.register(require('./resources/board/board.router'));

fastify.register(require('./resources/task/task.router'));

/**
 * create server
 * @returns Promise<void>
 */

app.listen(PORT, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${PORT}`);
});
