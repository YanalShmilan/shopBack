const express = require('express');
const { Product } = require('../db/models');
const upload = require('../middleware/multer');

const {
  getProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require('../controllers/productsController');

const router = express.Router();
router.param('productId', async (req, res, next, productId) => {
  const product = await Product.findByPk(productId);
  console.log(product);
  if (product) {
    req.product = product;
    next();
  } else {
    next({ message: 'product not found', status: 404 });
  }
});

router.get('/', getProducts);
router.get('/:productId', getProductDetails);
router.put('/:productId', upload.single('img'), updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;
