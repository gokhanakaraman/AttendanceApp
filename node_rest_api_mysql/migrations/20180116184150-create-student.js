'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first: {
        type: Sequelize.STRING
      },
      last: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      lat: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lecture : {
        type: Sequelize.STRING
      },
      device: {
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Students');
  }
};