import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/User';
import Token from '../Interfaces/Token';

const secret = process.env.JWT_SECRET || 'jwt_secret' as jwt.Secret;
export default class TokenJwt implements Token {
  private jwt = jwt;

  generate(user: IUser): string {
    const { password: _password, ...userWithoutPassword } = user;
    const token = this.jwt.sign({ data: userWithoutPassword }, secret);
    return token;
  }

  validateToken(token: string): jwt.JwtPayload | null {
    try {
      return this.jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
