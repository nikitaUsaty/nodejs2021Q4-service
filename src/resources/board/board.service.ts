import ITask from '../task/task.service';

const { v4: uuidv4 } = require('uuid');
const tasks = require('../task/task.service');

interface IColums {
  id: string;
  title: string;
  order: string | number;
}

interface IBoard {
  id: string;
  title: string;
  columns: IColums[];
}
const boards: IBoard[] = [];

const getAllBoards = () => boards;

const getBoardWithId = (id: string) => {
  const user = boards.find((u) => u.id === id);
  return user;
};

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

const updateBoard = (id: string, body: IBoard) => {
  const userToUpdate = boards.find((board) => board.id === id);
  if (!userToUpdate) {
    return false;
  }
  const updatePerson = body;
  updatePerson.id = id;

  const index = boards.findIndex((board) => board.id === id);
  boards[index] = {
    ...updatePerson,
  };
  return updatePerson;
};

const removeBoard = (id: string) => {
  const boardToDelete = boards.find((board) => board.id === id);
  if (!boardToDelete) {
    return false;
  }
  const tasksToDelete: ITask[] = [];

  for (let i = 0; i < tasks.length; i++) {
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
