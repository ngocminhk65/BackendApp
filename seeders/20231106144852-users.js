// Step 2: Create a new seeder file, e.g., 20231106145039-add-users.js

'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 3: Write the up function to insert data into the Users table
    await queryInterface.bulkInsert('Users', [{
      avatar_path: 'path/to/avatar1',
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password',saltRounds), // make sure to hash passwords in a real application
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      avatar_path: 'path/to/avatar2',
      username: 'JaneDoe',
      email: 'jane.doe@example.com',
      password:await bcrypt.hash('password',saltRounds), // make sure to hash passwords in a real application
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Step 4: Write the down function to delete the inserted data
    await queryInterface.bulkDelete('Users', null, {});
  }
};