const fastify = require('fastify')({
  logger: true,
});

fastify.get('/', (req, reply) => {
  reply.send('Hallo');
});

module.exports = fastify;
