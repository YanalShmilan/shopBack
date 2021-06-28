// let data = require('../data');
// const slugify = require('slugify');
const { Shop, Product } = require('../db/models');

exports.createShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.img = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    const newShop = await Shop.create(req.body);

    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};
exports.getShops = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Product,
        attributes: ['id'],
        as: 'products',
      },
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};
exports.getShopDetails = (req, res, next) => res.status(200).json(req.shop);

exports.deleteShop = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
exports.updateShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.img = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    await req.shop.update(req.body);
    res.json(req.shop);
  } catch (error) {
    next(error);
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.img = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    req.body.shopId = req.shop.id;
    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
