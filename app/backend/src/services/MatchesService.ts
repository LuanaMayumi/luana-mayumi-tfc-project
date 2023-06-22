import { NewEntity } from '../Interfaces';
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

  public async updateProgressMatche(
    id: string,
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateProgress(id);
    return { status: 'SUCCESSFUL',
      data: {
        message:
      'Finished',
      } };
  }

  public async updateMatche(
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<string>> {
    await this.matchesModel.updateMatche(id, homeTeamGoals, awayTeamGoals);
    return {
      status: 'SUCCESSFUL',
      data: 'Matche updated',
    };
  }

  public async createMatche(
    newMatche: NewEntity<IMatche>,
  ):
    Promise<ServiceResponse<IMatche | string>> {
    const { homeTeamId, awayTeamId } = newMatche;
    const findHomeTeam = await this.matchesModel.getByTeamId(homeTeamId);
    const findAwayTeam = await this.matchesModel.getByTeamId(awayTeamId);
    if (!findHomeTeam || !findAwayTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const newMatcheDb = await this.matchesModel.create(newMatche);
    return {
      status: 'SUCCESSFUL', data: newMatcheDb,
    };
  }
}
