import ITask from './task.memory.repository';

const { v4: uuidv4 } = require('uuid');

const tasks = require('./task.memory.repository');

/**
 * Returns all tasks
 * @returns all tasks
 */
const getAllTasks = () => tasks;

/**
 * Returns task with id
 * @param id - string board id
 * @param idd - string task id
 * @returns task by id
 */

const getTaskWithId = (id: string, idd: string) => {
  const task = tasks.find((u: ITask) => u.id === idd);
  return task;
};

/**
 * Create task
 * @param task - ITask receiving task
 * @param idd - board id
 * @returns new created task
 */

const createNewTask = (task: ITask, idd: { boardId: string }) => {
  const Task = {
    ...task,
    id: uuidv4(),
  };
  Task.boardId = idd.boardId;
  tasks.push(Task);

  return Task;
};

/**
 * Update task
 * @param idd - string task
 * @param body - ITask id
 * @returns updated task
 */

const updateTask = (idd: string, body: ITask) => {
  const taskToUpdate = tasks.find((task: ITask) => task.id === idd);

  if (!taskToUpdate) {
    return false;
  }
  const updatedTask = body;
  updatedTask.id = idd;

  const index = tasks.findIndex((task: ITask) => {
    task.id === idd;
    return true;
  });

  tasks[index] = {
    ...updatedTask,
  };
  return updatedTask;
};

/**
 * Remove task
 * @param id -  board id
 * @param idd -  task id
 * @returns message of deletion or error
 */

const removeTask = (id: string, idd: string) => {
  const userToDelete = tasks.find((task: ITask) => task.id === idd);
  if (!userToDelete) {
    return false;
  }
  tasks.splice(tasks.indexOf(userToDelete), 1);
  return `Task with id ${id} has been deleted!`;
};

module.exports = {
  getAllTasks,
  getTaskWithId,
  createNewTask,
  updateTask,
  removeTask,
};
