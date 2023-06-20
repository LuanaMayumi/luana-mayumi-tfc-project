import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Model,
} from 'sequelize';
import db from '.';

class SequelizeTeamsModel extends Model<InferAttributes<SequelizeTeamsModel>,
InferCreationAttributes<SequelizeTeamsModel>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default SequelizeTeamsModel;
