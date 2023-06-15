import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import { ITeam } from '../Interfaces/Teams';

export default class TeamsModel {
  private model = SequelizeTeamsModel;

  async getAllTeams(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async getOneTeam(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    return dbData;
  }
}
