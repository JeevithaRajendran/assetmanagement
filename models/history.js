'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
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
  History.init({
    assetId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    dateofpurchase: {
      type: DataTypes.DATEONLY,
      allowNull:true
    },
    issuedate: {
      type: DataTypes.DATEONLY,
      allowNull:true
    },
    returndate: {
      type: DataTypes.DATEONLY,
      allowNull:true
    },
    empId: {
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    empName: {
      type:DataTypes.STRING,
      allowNull:true
    },
    scrapdate: {
      type: DataTypes.DATEONLY,
      allowNull:true
    }
  }, {
    sequelize,
    tableName: 'histories',
    modelName: 'History',
  });
  return History;
};