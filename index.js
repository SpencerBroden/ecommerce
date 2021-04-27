const express = require('express');
const cors = require('cors');
const storeTemplate = require('./views/store/index');
const signupTemplate = require('./views/auth/signup');

const app = express();
const db = require('./model');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  const products = [{}];
  res.send(storeTemplate({ products }));
});

app.get('/users', db.getUsers);

app.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  await db.addLogin(password, email);
  res.redirect('/');
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
