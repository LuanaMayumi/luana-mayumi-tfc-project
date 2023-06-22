import {
  Model,
  DataTypes,
  InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '.';
import TeamsModel from './SequelizeTeamsModel';

class SequelizeMatchesModel extends Model<InferAttributes<SequelizeMatchesModel>,
InferCreationAttributes<SequelizeMatchesModel>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: { // relação com a tabela teams, recebe o id
    type: DataTypes.INTEGER,
    allowNull: false,
    // unique: true,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  awayTeamId: { // relação com a tabela teams, recebe o id
    type: DataTypes.INTEGER,
    allowNull: false,
    // unique: true,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

SequelizeMatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'homeTeamId',
  targetKey: 'id',
  as: 'homeTeam',
});

SequelizeMatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'awayTeamId',
  targetKey: 'id',
  as: 'awayTeam' });

export default SequelizeMatchesModel;
