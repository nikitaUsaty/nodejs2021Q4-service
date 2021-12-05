const { v4: uuidv4 } = require('uuid');
const users = require('./user.memory.repository');

const tasks = require('../task/task.memory.repository');

const getAllUsers = () => users;

const getUserWithId = (id) => {
  const user = users.find((u) => u.id === id);
  return user;
};

const createNewUser = (user) => {
  const User = {
    id: uuidv4(),
    ...user,
  };
  users.push(User);
  if (User.password) {
    delete User.password;
  }
  return User;
};

const updateUser = (id, body) => {
  const userToUpdate = users.find((user) => user.id === id);
  if (!userToUpdate) {
    return false;
  }
  const updatePerson = body;
  updatePerson.id = id;

  const index = users.findIndex((user) => user.id === id);
  users[index] = {
    ...updatePerson,
  };
  return updatePerson;
};

const removeUser = (id) => {
  const userToDelete = users.find((user) => user.id === id);
  if (!userToDelete) {
    return false;
  }

  tasks.map((el) => {
    if (el.userId === id) {
      el.userId = null;
    }
    return false;
  });

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
