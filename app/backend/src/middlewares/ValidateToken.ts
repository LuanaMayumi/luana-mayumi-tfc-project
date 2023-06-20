import { Request, Response, NextFunction } from 'express';
import TokenJWT from '../services/TokenJwt';

const tokenJWT = new TokenJWT();
export default class ValidateToken {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const isValid = tokenJWT.validateToken(authorization);
    if (!isValid) return res.status(401).json({ message: 'Token must be a valid token' });

    next();
  }
}
