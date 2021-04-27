const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/auth');
const storeTemplate = require('./views/store/index');
const products = require('./products.json');
const app = express();
const db = require('./model');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieSession({ keys: ['qwertyuiop'] }));
app.use(authRouter);
const user = { id: '' };
app.get('/', async (req, res) => {
  //const products = [{ title: 'Shoe', price: 10 }];
  res.send(storeTemplate({ products, user }));
});

app.get('/users', db.getUsers);

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
