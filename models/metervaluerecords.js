'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeterValueRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MeterValueRecords.init({
    uuid: DataTypes.STRING,
    charge_point_id: DataTypes.STRING,
    payload: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MeterValueRecords',
  });
  return MeterValueRecords;
};