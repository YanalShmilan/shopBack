const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Shop, { foreignKey: 'userId', as: 'userShops' });
    models.Shop.belongsTo(User, { foreignKey: 'userId' });
  };

  return User;
};
