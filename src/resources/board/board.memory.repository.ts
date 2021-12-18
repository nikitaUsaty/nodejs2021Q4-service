interface IColums {
  id: string;
  title: string;
  order: string | number;
}

export default interface IBoard {
  id: string;
  title: string;
  columns: IColums[];
}
const boards: IBoard[] = [];

module.exports = boards;
