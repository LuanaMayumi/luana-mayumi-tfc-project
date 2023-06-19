import {
  Model,
  DataTypes,
  InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '.';

class MatchesModel extends Model<InferAttributes<MatchesModel>,
InferCreationAttributes<MatchesModel>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awaiTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awaiTeamGoals: {
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

export default MatchesModel;
