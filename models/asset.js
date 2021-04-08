'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
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
  Asset.init({
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
    assigned: {
      type:DataTypes.BOOLEAN,
      allowNull:true,
    },
    status: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    empId: {
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    empName: {
      type:DataTypes.STRING,
      allowNull:true
    },
  },
   {
    sequelize,
    tableName: 'assets',
    modelName: 'Asset',
  });
  return Asset;
};