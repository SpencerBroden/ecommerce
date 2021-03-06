const express = require('express');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const authRouter = require('./routes/auth');
const storeTemplate = require('./views/store/index');
const products = require('./products.json');
const app = express();
const db = require('./model');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(authRouter);

app.get('/', async (req, res) => {
  try {
    const products = await db.listProducts();
    res.send(storeTemplate({ products }));
  } catch {
    res.send(storeTemplate({ products }));
  }
});

app.post(
  '/',
  [
    check('quantity')
      .trim()
      .isInt([{ min: 1 }])
      .withMessage('Must be a integer greater than 0'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      try {
        const products = await db.listProducts();
        return res.send(storeTemplate({ products, errors }));
      } catch {
        return res.send(storeTemplate({ products, errors }));
      }
    }
    const { quantity, price, customer_id, product_id } = req.body;
    // TO FIX customer_id
    const total = quantity * price;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
      const order = await db.addOrder(quantity, total, now, 1, product_id);
    } catch {
      res.redirect('/');
    }
    res.redirect('/');
  }
);

app.get('/api/users', db.getUsers);

app.get('/api/hashs', db.getLogins);

app.get('/api/products', db.getProducts);

app.get('/api/orders', db.getOrders);

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
