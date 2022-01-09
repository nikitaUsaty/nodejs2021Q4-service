import { logger } from './logger';

const app = require('fastify')({
  logger: { logger },
});

const { PORT } = require('./common/config');

app.register(require('./resources/users/user.router'));

app.register(require('./resources/board/board.router'));

app.register(require('./resources/task/task.router'));

/**
 * create server
 * @returns Promise<void>
 */

app.listen(PORT, '0.0.0.0', (err: string) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${PORT}`);
});
