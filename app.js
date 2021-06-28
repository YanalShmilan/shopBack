const express = require('express');
const db = require('./db/models');
const port = 8000;
const path = require('path');
const cors = require('cors');
const app = express();
const productsRoutes = require('./routes/products');
const shopsRoutes = require('./routes/shops');
app.use(express.json());
app.use(cors());

app.use('/products', productsRoutes);
app.use('/shops', shopsRoutes);
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json(err.message ?? { message: 'Internal Server Error.!' });
});
app.listen(8000, () => {});
