import { NextFunction, Request, Response } from 'express';

export default class ValidateLogin {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = /\S+@\S+.\S+/;

    if (!email) { return res.status(400).json({ message: 'All fields must be filled' }); }
    if (!password) { return res.status(400).json({ message: 'All fields must be filled' }); }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length <= 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
