import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatche from '../Interfaces/Matche';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatche[]>> {
    const allMatches = await this.matchesModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatches(inProgress:boolean): Promise<ServiceResponse<IMatche[]>> {
    const matches = await this.matchesModel.get(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  // public async updateMatche(
  //   id: string,
  //   data: IMatche,
  // ): Promise<ServiceResponse<{ message: string }>> {
  //   const foundMatche = await this.matchesModel.findByPk(id);

  //   if (!foundMatche) {
  //     return {
  //       status: 'NOT_FOUND',
  //       data: {
  //         message: 'Matche not found',
  //       },
  //     };
  //   }

  //   await this.matchesModel.update(id, data);
  //   return { status: 'SUCCESSFUL',
  //     data: {
  //       message:
  //     'Finished',
  //     } };
  // }
}
