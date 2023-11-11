// Step 2: Create a new migration file, e.g., 20220401-create-user.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 3: Write the up function to create the user table
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      avatar_path: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Step 4: Write the down function to drop the user table
    await queryInterface.dropTable('Users');
  }
};