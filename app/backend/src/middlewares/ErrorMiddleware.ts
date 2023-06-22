import { Request, Response, NextFunction } from 'express';

export default class ErrorMiddleware {
  static handle(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'erro' });
    }

    next();
  }
}
