import IUser from './user.memory.repository';

export {};

const { v4: uuidv4 } = require('uuid');
const users = require('./user.memory.repository');
const tasks = require('../task/task.memory.repository');

/**
 * Returns all users
 * @returns all users
 */
const getAllUsers = (): IUser[] => users;

/**
 * Returns user with id
 * @param id:string user id
 * @returns user by id
 */
const getUserWithId = (id: string): IUser => {
  const user = users.find((u: IUser) => u.id === id);
  return user;
};

/**
 * Create new user
 * @param user - IUser user
 * @returns new created user
 */

const createNewUser = (user: IUser): IUser => {
  const User = { ...user, id: uuidv4() };
  users.push(User);
  if (User.password) {
    delete User.password;
  }
  return User;
};

/**
 * Update user
 * @param id - string user id
 * @param body - IUser users body
 * @returns updated task
 */

const updateUser = (
  id: string,
  body: { id: string; name: string; login: string }
) => {
  const userToUpdate = users.find((user: IUser) => user.id === id);
  if (!userToUpdate) {
    return false;
  }
  const updatePerson = body;
  updatePerson.id = id;

  const index = users.findIndex((user: IUser) => user.id === id);
  users[index] = {
    ...updatePerson,
  };
  return updatePerson;
};

/**
 * Remove user
 * @param id - string user's id
 * @returns message of deletion or error
 */

const removeUser = (id: string) => {
  const userToDelete = users.find((user: IUser) => user.id === id);
  if (!userToDelete) {
    return false;
  }

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i]?.userId === id) {
      tasks[i].userId = null;
    }
  }

  users.splice(users.indexOf(userToDelete), 1);
  return `User with id ${id} has been deleted!`;
};

module.exports = {
  getAllUsers,
  createNewUser,
  getUserWithId,
  updateUser,
  removeUser,
};
