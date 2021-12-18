import ITask from '../task/task.memory.repository';
const { v4: uuidv4 } = require('uuid');

const tasks = require('../task/task.memory.repository');

const getAllTasks = () => tasks;

const getTaskWithId = (id: string, idd: string) => {
  const user = tasks.find((u: ITask) => u.id === idd);
  return user;
};

const createNewTask = (task: ITask, idd: { boardId: string }) => {
  const Task = {
    ...task,
    id: uuidv4(),
  };
  Task.boardId = idd.boardId;
  tasks.push(Task);

  return Task;
};

const updateTask = (idd: string, body: ITask) => {
  const taskToUpdate = tasks.find((task: ITask) => task.id === idd);

  if (!taskToUpdate) {
    return false;
  }
  const updatedTask = body;
  updatedTask.id = idd;

  const index = tasks.findIndex((task: ITask) => {
    task.id === idd;
  });
  tasks[index] = {
    ...updatedTask,
  };
  return updatedTask;
};

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
