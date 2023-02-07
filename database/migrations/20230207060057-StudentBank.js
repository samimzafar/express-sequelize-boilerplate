'use strict';
const table = "student_banks";
module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fk_student_Id: {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' }
      },
      fk_bank_Id: {
        type: Sequelize.INTEGER,
        references: { model: 'banks', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable(table);
  }
};
