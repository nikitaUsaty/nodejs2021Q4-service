const boardService = require('./task.service');

async function routes(fastify) {
  fastify.get('/boards/:boardId/tasks', async () => {
    const result = await boardService.getAllTasks();
    if (!result) {
      throw new Error('Error, no Task data');
    }
    return result;
  });

  fastify.get('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    const result = await boardService.getTaskWithId(
      request.params.boardId,
      request.params.taskId
    );
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No Task with id ${request.params.id} was found`));
    }
    return result;
  });

  fastify.post('/boards/:boardId/tasks', async (request, reply) => {
    const result = await boardService.createNewTask(
      request.body,
      request.params
    );
    reply.code(201);
    if (!result) {
      throw new Error('Error, no Task data');
    }
    return result;
  });

  fastify.put('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    const result = await boardService.updateTask(
      request.params.id,
      request.body,
      request.params.taskId
    );
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No Task with id ${request.params.id} was found`));
    }
    return result;
  });

  fastify.delete('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    const result = await boardService.removeTask(
      request.params.id,
      request.params.taskId
    );
    if (!result) {
      reply
        .status(404)
        .send(new Error(`No task with id ${request.params.id} was found`));
    }
    return result;
  });
}

module.exports = routes;
