'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    await queryInterface.dropTable('histories');
  }
};