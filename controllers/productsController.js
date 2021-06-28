// let data = require('../data');
// const slugify = require('slugify');
const { Product } = require('../db/models');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
exports.getProductDetails = (req, res, next) =>
  res.status(200).json(req.product);

exports.deleteProduct = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.img = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    await req.product.update(req.body);
    res.json(req.product);
  } catch (error) {
    next(error);
  }
};
