const { v4: uuidv4 } = require('uuid');
const tasks = require('./task.memory.repository');
const board = require('./task.memory.repository');

const getAllTasks = () => board;

const getTaskWithId = (id, idd) => {
  const user = board.find((u) => u.id === idd);
  return user;
};

const createNewTask = (task, idd) => {
  const Task = {
    id: uuidv4(),
    ...task,
  };
  Task.boardId = idd.boardId;
  board.push(Task);

  return Task;
};

const updateTask = (id, body, idd) => {
  const userToUpdate = tasks.find((user) => user.id === idd);
  if (!userToUpdate) {
    return false;
  }
  const updatePerson = body;
  updatePerson.id = idd;

  const index = tasks.findIndex((user) => user.id === idd);
  tasks[index] = {
    ...updatePerson,
  };
  return updatePerson;
};

const removeTask = (id, idd) => {
  const userToDelete = board.find((user) => user.id === idd);
  if (!userToDelete) {
    return false;
  }
  board.splice(board.indexOf(userToDelete), 1);
  return `Task with id ${id} has been deleted!`;
};

module.exports = {
  getAllTasks,
  getTaskWithId,
  createNewTask,
  updateTask,
  removeTask,
};
