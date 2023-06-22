import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import IMatche from '../Interfaces/Matche';
import { NewEntity } from '../Interfaces';
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

  async get(inProgress: boolean): Promise<IMatche[]> {
    const db = await this.model.findAll({
      where: { inProgress },
      include: [
        { as: 'homeTeam',
          model: SequelizeTeamsModel,
          attributes: { exclude: ['id'] },
        },
        { as: 'awayTeam',
          model: SequelizeTeamsModel,
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return db;
  }

  async updateProgress(
    id: string,
  ): Promise<IMatche | null> {
    const [affectedRows] = await this.model.update(
      {
        inProgress: false,
      },
      {
        where: {
          id,
        },
      },
    );
    if (affectedRows === 0) return null;
    const db = await this.model.findByPk(id);
    return db;
  }

  async updateMatche(
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.model.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
  }

  async create(
    data: NewEntity<IMatche>,
  ): Promise<IMatche | null> {
    const { homeTeamId, awayTeamId } = data;
    const homeTeamIdExistOnDB = await this.model.findByPk(homeTeamId);
    const awayTeamIdExistOnDB = await this.model.findByPk(awayTeamId);

    if (!homeTeamIdExistOnDB || !awayTeamIdExistOnDB) {
      return null;
    }
    const newMatche = await this.model.create({ ...data, inProgress: true });
    return newMatche;
  }
}
