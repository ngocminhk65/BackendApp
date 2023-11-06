'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      review: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_delete: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue : null,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews');
  }
};