'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return {...this.get(), createdAt:undefined, updatedAt:undefined}
    }
  };
  Report.init({
    assetId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    }, 
    model: {
      type: DataTypes.STRING,
      allowNull:false
    }, 
    dateofpurchase: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },  
    serialnumber: {
      type: DataTypes.STRING,
      allowNull:false
    },
    branch: {
      type:DataTypes.STRING,
      allowNull:false
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false
    }
  },
   {
    sequelize,
    tableName: 'reports',
    modelName: 'Report',
  });
  return Report;
};