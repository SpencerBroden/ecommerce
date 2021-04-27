const express = require('express');
const storeTemplate = require('./views/store/index');
const signupTemplate = require('./views/auth/signup');
const db = require('./model');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const products = [{}];
  res.send(storeTemplate({ products }));
});

app.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  db.addLogin(password, email);
  res.redirect('/');
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
