import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const boardService = require('./board.service');

/**
 * Create board router
 * @param fastify - framework to create server
 * @returns depends on the method has been called, returns either
 * result or throw error
 */

async function routes(fastify: FastifyInstance) {
  fastify.get('/boards', async () => {
    /**
     * Create board
     * @param board:IBoard receiving board's body
     * @returns new created board
     */

    const result = await boardService.getAllBoards();
    if (!result) {
      throw new Error('Error, no users data');
    }
    return result;
  });

  fastify.get('/boards/:id', async (request: FastifyPluginOptions, reply) => {
    const result = await boardService.getBoardWithId(request.params.id);
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No board with id ${request.params.id} was found`));
    }
    return result;
  });

  fastify.post('/boards', async (request, reply) => {
    const result = await boardService.createNewBoard(request.body);
    reply.code(201);
    if (!result) {
      throw new Error('Error, no board data');
    }
    return result;
  });

  fastify.put('/boards/:id', async (request: FastifyPluginOptions, reply) => {
    const result = await boardService.updateBoard(
      request.params.id,
      request.body
    );
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No board with id ${request.params.id} was found`));
    }
    return result;
  });

  fastify.delete(
    '/boards/:id',
    async (request: FastifyPluginOptions, reply) => {
      const result = await boardService.removeBoard(request.params.id);
      if (!result) {
        reply
          .status(404)
          .send(new Error(`No board with id ${request.params.id} was found`));
      }
      return result;
    }
  );
}

module.exports = routes;
