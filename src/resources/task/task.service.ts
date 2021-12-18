const { v4: uuidv4 } = require('uuid');
// const board = require('./task.memory.repository');

export default interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
  params: object;
}

const tasks: ITask[] = [];

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
  const userToUpdate = tasks.find((task: ITask) => {
    task.id === idd;
  });
  if (!userToUpdate) {
    return false;
  }
  const updatePerson = body;
  updatePerson.id = idd;

  const index = tasks.findIndex((task: ITask) => task.id === idd);
  tasks[index] = {
    ...updatePerson,
  };
  return updatePerson;
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
