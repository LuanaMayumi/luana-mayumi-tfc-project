import { JwtPayload } from 'jsonwebtoken';
import IUser from './User';

export default interface Token {
  generate(user: IUser): string
  validateToken(token: string): JwtPayload | null;
}
