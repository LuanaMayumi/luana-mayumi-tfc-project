import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Encrypter from '../Interfaces/Encrypter';
import UserModel from '../models/UserModel';
import Token from '../Interfaces/Token';

// comparar a senha informada no body com a criptografada no sb
// login - sucesso: exibir status 200 com o token
// fazer o login sem um email retorna o status 'bad request' - verificar o status
// se o login nao tiver o campo email, retornar status 400, { "message": "All fields must be filled" }
// sem password, status 400, { "message": "All fields must be filled" }
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
        status: 'UNAUTHORIZED',
        data:
      { message: 'All fields must be filled' } };
    }

    const isValid = await this.encrypter.compare(password, user.password);

    if (!isValid) {
      return {
        status: 'UNAUTHORIZED',
        data:
      { message: 'All fields must be filled' } };
    }

    const token = this.token.generate(user);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
