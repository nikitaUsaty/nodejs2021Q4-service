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

module.exports = tasks;
