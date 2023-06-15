import { NextFunction, Request, Response } from 'express';

export default class ValidateLogin {
  static validate(_err: Error, req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = /^tfc@projeto\.com$/;

    if (!emailRegex.test(email)) return 'Invalid Email';

    if (password.length <= 6) return 'Password must have 6 characteres';

    next();
  }
}
