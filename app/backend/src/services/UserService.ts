import IUser from '../Interfaces/User';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Encrypter from '../Interfaces/Encrypter';
import UserModel from '../models/UserModel';
import Token from '../Interfaces/Token';

export default class UserService {
  constructor(
    private userModel = new UserModel(),
    private encrypter: Encrypter,
    private token: Token,
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findUser(email);

    if (!user) {
      return {
        status: 'INVALID_DATA',
        data:
      { message: 'Invalid email or password' } };
    }

    const isValid = await this.encrypter.compare(password, user.password);

    if (!isValid) {
      return {
        status: 'INVALID_DATA',
        data:
      { message: 'Invalid email or password' } };
    }

    const token = this.token.generate(user);
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async loginRole(authorization: string): Promise<ServiceResponse<IUser['role']>> {
    const tokenIsValid = this.token.validateToken(authorization);
    if (!tokenIsValid) {
      return {
        status: 'UNAUTHORIZED',
        data:
        { message: 'Token must be a valid token' },
      };
    }
    const { role } = tokenIsValid.data;
    return {
      status: 'SUCCESSFUL',
      data: role,
    };
  }
}
