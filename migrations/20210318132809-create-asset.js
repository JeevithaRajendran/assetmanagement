'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      assetId: {
        type: DataTypes.INTEGER,
        allowNull:false,
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
        type: DataTypes.BIGINT,
        allowNull:false
      },
      branch: {
        type:DataTypes.STRING,
        allowNull:false
      },
      assigned: {
        type:DataTypes.BOOLEAN,
        allowNull:false
      },
      status: {
        type:DataTypes.STRING,
        allowNull:false
      },
      empId: {
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      empName: {
        type:DataTypes.STRING,
        allowNull:true
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
    await queryInterface.dropTable('assets');
  }
};