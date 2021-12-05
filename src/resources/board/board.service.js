/* eslint-disable consistent-return */
const { v4: uuidv4 } = require('uuid');
const board = require('./board.memory.repository');

const getAllBoards = () => board;

const getBoardWithId = (id) => {
  const user = board.find((u) => u.id === id);
  return user;
};

const createNewBoard = (user) => {
  const User = {
    id: uuidv4(),
    ...user,
  };
  board.push(User);
  if (User.password) {
    delete User.password;
  }
  return User;
};

const updateBoard = (id, body) => {
  const userToUpdate = board.find((user) => user.id === id);
  if (!userToUpdate) {
    return;
  }
  const updatePerson = body;
  updatePerson.id = id;

  const index = board.findIndex((user) => user.id === id);
  board[index] = {
    ...updatePerson,
  };
  return updatePerson;
};

const removeBoard = (id) => {
  const userToDelete = board.find((user) => user.id === id);
  if (!userToDelete) {
    return;
  }
  board.splice(board.indexOf(userToDelete), 1);
  return `User with id ${id} has been deleted!`;
};

module.exports = {
  getAllBoards,
  createNewBoard,
  getBoardWithId,
  updateBoard,
  removeBoard,
};
