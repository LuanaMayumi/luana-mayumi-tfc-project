import IUser from './User';

export default interface Token {
  generate(user: IUser): string
}
