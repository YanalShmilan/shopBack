'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'name', Sequelize.STRING, {
      unique: true,
      allowNull: false,
    });
    await queryInterface.addColumn('Products', 'price', Sequelize.INTEGER, {});
    await queryInterface.addColumn('Products', 'slug', Sequelize.STRING, {
      unique: true,
      allowNull: false,
    });
    await queryInterface.addColumn('Products', 'img', Sequelize.STRING, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'name');
    await queryInterface.removeColumn('Products', 'price');
    await queryInterface.removeColumn('Products', 'slug');
    await queryInterface.removeColumn('Products', 'img');
  },
};
