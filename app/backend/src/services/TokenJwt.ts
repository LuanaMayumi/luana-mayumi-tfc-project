import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/User';
import Token from '../Interfaces/Token';

const secret = process.env.JWT_SECRET as jwt.Secret;
export default class TokenJwt implements Token {
  private jwt = jwt;

  generate(user: IUser): string {
    const { password: _password, ...userWithoutPassword } = user;
    const token = this.jwt.sign({ data: userWithoutPassword }, secret);
    return token;
  }
}
