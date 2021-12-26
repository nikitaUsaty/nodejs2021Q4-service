import { app } from './logger';

const { PORT } = require('./common/config');

app.register(require('./resources/users/user.router'));

app.register(require('./resources/board/board.router'));

app.register(require('./resources/task/task.router'));

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
