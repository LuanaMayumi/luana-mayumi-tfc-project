import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/Teams';
import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamsModel.getAllTeams();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
