const usersService = require('./user.service');

async function routes(fastify) {
  fastify.get('/', async () => 'Welcome');

  fastify.get('/users', async () => {
    const result = await usersService.getAll();
    if (!result) {
      throw new Error('Error, no users data');
    }
    return result;
  });

  fastify.get('/users/:id', async (request, reply) => {
    const result = await usersService.getUserById(request.params.id);
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No user with id ${request.params.id} was found`));
    }
    return result;
  });

  fastify.post('/users', async (request, reply) => {
    const result = await usersService.createUser(request.body);
    reply.code(201);
    if (!result) {
      throw new Error('Error, no users data');
    }
    return result;
  });

  fastify.put('/users/:id', async (request, reply) => {
    const result = await usersService.updateUser(
      request.params.id,
      request.body
    );
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No user with id ${request.params.id} was found`));
    }
    return result;
  });

  fastify.delete('/users/:id', async (request, reply) => {
    const result = await usersService.deleteUser(request.params.id);
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No user with id ${request.params.id} was found`));
    }
    return result;
  });
}

module.exports = routes;
