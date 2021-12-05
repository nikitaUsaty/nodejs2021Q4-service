const fastify = require('fastify')({
  logger: true,
});

const { PORT } = require('./common/config');

fastify.register(require('./resources/users/user.router'));

fastify.register(require('./resources/board/board.router'));

fastify.listen(PORT, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
