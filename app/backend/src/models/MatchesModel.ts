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

  // async update(
  //   id: string,
  //   data: IMatche,
  // ): Promise<IMatche | null> {
  //   const [affectedRows] = await this.model.update(
  //     data, // é pra alterar só uma chave(inProgress)?
  //     {
  //       where: {
  //         id,
  //       },
  //     },
  //   );
  //   if (affectedRows === 0) return null;
  //   const db = await this.model.findByPk(id);

  //   return db;
  // }
}
