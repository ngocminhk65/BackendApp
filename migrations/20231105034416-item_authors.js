'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.createTable('item_authors', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  item_id : {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  author_id : {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  created_at : {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at : {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
  deleted_at : {
    type: Sequelize.DATE,
    allowNull: true,
  
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
