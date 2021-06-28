const SequelizeSlugify = require('sequelize-slugify');
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, defaultValue: 1, min: 3 },
    img: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  SequelizeSlugify.slugifyModel(Product, { source: ['name'] });
  Product.associate = (models) => {
    models.Shop.hasMany(Product, { foreignKey: 'shopId', as: 'products' });
    Product.belongsTo(models.Shop, { foreignKey: 'shopId' });
  };
  return Product;
};
