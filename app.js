const express = require('express');
const db = require('./db/models');
const port = 8000;
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const { localStrategy } = require('./middleware/passport');
const { jwtStrategy } = require('./middleware/passport');

const app = express();
const productsRoutes = require('./routes/products');
const shopsRoutes = require('./routes/shops');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(cors());
app.use(express.json());
// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use('/products', productsRoutes);
app.use('/shops', cors(), shopsRoutes);
app.use(usersRoutes);
app.use(ordersRoutes);

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
