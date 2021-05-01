const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const storeTemplate = require('./views/store/index');
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
    res.send(storeTemplate({}));
  }
});

app.get('/api/users', db.getUsers);

app.get('/api/hashs', db.getLogins);

app.get('/api/products', db.getProducts);

app.get('/api/orders', db.getOrders);

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
