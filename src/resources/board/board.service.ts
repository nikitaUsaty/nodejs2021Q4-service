import ITask from '../task/task.memory.repository';
import IBoard from './board.memory.repository';

const { v4: uuidv4 } = require('uuid');
const tasks = require('../task/task.memory.repository');
const boards = require('./board.memory.repository');

/**
 * Returns all boards
 * @returns all boards
 */
const getAllBoards = () => boards;

/**
 * Returns board with id
 * @param id - string board id
 * @returns board by id
 */

const getBoardWithId = (id: string) => {
  const user = boards.find((u: IBoard) => u.id === id);
  return user;
};

/**
 * Create board
 * @param board - IBoard receiving board's body
 * @returns new created board
 */

const createNewBoard = (board: IBoard) => {
  const newBoard = {
    ...board,
    id: uuidv4(),
  };
  if (newBoard.columns) {
    for (let i = 0; i < newBoard.columns.length; i += 1) {
      newBoard.columns[i]!.id = uuidv4();
    }
  }
  boards.push(newBoard);
  return newBoard;
};

/**
 * Update board
 * @param id - string board's id
 * @param body - IBoard board's body
 * @returns updated board
 */

const updateBoard = (id: string, body: IBoard) => {
  const userToUpdate = boards.find((board: IBoard) => board.id === id);
  if (!userToUpdate) {
    return false;
  }
  const updateBr = body;
  updateBr.id = id;

  const index = boards.findIndex((board: IBoard) => board.id === id);
  boards[index] = {
    ...updateBr,
  };
  return updateBr;
};

/**
 * Delete board and tasks
 * @param id - string board id
 * @returns message of deletion or error
 */

const removeBoard = (id: string) => {
  const boardToDelete = boards.find((board: IBoard) => board.id === id);
  if (!boardToDelete) {
    return false;
  }
  const tasksToDelete: ITask[] = [];

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].boardId === id) {
      tasksToDelete.push(tasks[i]);
    }
  }

  for (let i = 0; i < tasksToDelete.length; i += 1) {
    tasks.splice(tasks.indexOf(tasksToDelete[i]));
  }
  boards.splice(boards.indexOf(boardToDelete), 1);
  return `Board with id ${id} was deleted successfully!`;
};

module.exports = {
  getAllBoards,
  createNewBoard,
  getBoardWithId,
  updateBoard,
  removeBoard,
};
