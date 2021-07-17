const express = require('express');
const { Shop } = require('../db/models');
const upload = require('../middleware/multer');
const passport = require('passport');

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
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('img'),
  createShop
);
router.post(
  '/:shopId/products',
  passport.authenticate('jwt', { session: false }),
  upload.single('img'),
  createProduct
);
router.put('/:shopId', upload.single('img'), updateShop);
router.delete('/:shopId', deleteShop);

module.exports = router;
