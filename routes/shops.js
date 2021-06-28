const express = require('express');
const { Shop } = require('../db/models');
const upload = require('../middleware/multer');

const {
  createProduct,
  createShop,
  getShops,
  updateShop,
  deleteShop,
  getShopDetails,
} = require('../controllers/shopsController');

const router = express.Router();
router.param('shopId', async (req, res, next, shopId) => {
  const shop = await Shop.findByPk(shopId);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ message: 'shop not found', status: 404 });
  }
});
router.get('/', getShops);
router.get('/:shopId', getShopDetails);
router.post('/', upload.single('img'), createShop);
router.post('/:shopId/products', upload.single('img'), createProduct);
router.put('/:shopId', upload.single('img'), updateShop);
router.delete('/:shopId', deleteShop);

module.exports = router;
