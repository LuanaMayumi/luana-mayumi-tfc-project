import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import IMatche from '../Interfaces/Matche';
import SequelizeMatchesMOdel from '../database/models/SequelizeMatchesModel';

export default class MatchesModel {
  private model = SequelizeMatchesMOdel;

  async getAllMatches(): Promise<IMatche[]> {
    const db = await this.model.findAll(
      {
        include: [
          {
            as: 'homeTeam',
            model: SequelizeTeamsModel,
            attributes: { exclude: ['id'] },
          },
          {
            as: 'awayTeam',
            model: SequelizeTeamsModel,
            attributes: { exclude: ['id'] },
          },
        ],
      },
    );
    return db;
  }
}
