export default interface IUser {
  id: string;
  password?: string;
  name: string;
  login: string;
}

const users: IUser[] = [];

module.exports = users;
