import { Request, Response } from 'express';
import TokenJwt from '../services/TokenJwt';
import EncrypterBcrypt from '../services/EncrypterBcryptService';
import UserService from '../services/UserService';
import UserModel from '../models/UserModel';

const userModel = new UserModel();
const encrypter = new EncrypterBcrypt();
const tokenGenerator = new TokenJwt();

export default class UserController {
  constructor(
    private userService = new UserService(userModel, encrypter, tokenGenerator),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await this.userService.login(email, password);
    if (token.status === 'UNAUTHORIZED') return res.status(400).json(token.data);
    return res.status(200).json(token.data);
  }
}
