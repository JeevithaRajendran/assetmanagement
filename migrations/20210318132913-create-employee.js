'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('employees');
  }
};