'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
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
  Employee.init({
    empId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true
    }, 
    empName: {
      type:DataTypes.STRING,
      allowNull:false
    },  
    designation: {
      type:DataTypes.STRING,
      allowNull:false
    },  
    department: {
      type:DataTypes.STRING,
      allowNull:false
    },  
    branch: {
      type:DataTypes.STRING,
      allowNull:false
    },  
    dateofjoin:  {
      type:DataTypes.DATEONLY,
      allowNull:false
    },  
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    }
  }, 
  {
    sequelize,
    tableName: 'employees',
    modelName: 'Employee',
  });
  return Employee;
};