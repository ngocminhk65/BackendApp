'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('item_chap_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chap_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image_path: {
        type: Sequelize.STRING(150),
        allowNull: false,
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
        defaultValue: null,
      },
      orders: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('item_chap_images');
  }
};