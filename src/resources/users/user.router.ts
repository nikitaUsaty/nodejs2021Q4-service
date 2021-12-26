import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const usersService = require('./user.service');

/**
 * Create user router
 * @param fastify - framework to create server
 * @returns depends on the method has been called, returns either
 * result or throw error
 */

async function routes(fastify: FastifyInstance) {
  fastify.get('/', async () => 'Welcome');

  fastify.get('/users', async () => {
    const result = await usersService.getAllUsers();
    if (!result) {
      throw new Error('Error, no users data');
    }
    return result;
  });

  fastify.get('/users/:id', async (request: FastifyPluginOptions, reply) => {
    request.log.info('Some info about the current request');
    const result = await usersService.getUserWithId(request.params.id);
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No user with id ${request.params.id} was found`));
    }
    return result;
  });

  fastify.post('/users', async (request, reply) => {
    const result = await usersService.createNewUser(request.body);
    reply.code(201);
    if (!result) {
      throw new Error('Error, no users data');
    }
    return result;
  });

  fastify.put('/users/:id', async (request: FastifyPluginOptions, reply) => {
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

  fastify.delete('/users/:id', async (request: FastifyPluginOptions, reply) => {
    const result = await usersService.removeUser(request.params.id);
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No user with id ${request.params.id} was found`));
    }
    return result;
  });
}

module.exports = routes;
