import IUser from '../Interfaces/User';
import SequelizeUserModel from '../database/models/SequelizeUserModel';

export default class UserModel {
  private model = SequelizeUserModel;

  async findUser(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    };
  }
}
