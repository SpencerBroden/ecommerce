const express = require('express');

const { handleErrors } = require('./middlewares');
const signupTemplate = require('../views/auth/signup');
const signinTemplate = require('../views/auth/signin');
const db = require('../model');
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirm,
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirm],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await db.addLogin(password, email);
    if (user) {
      req.session.userId = user.id;
    }

    res.redirect('/');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post('/signin', async (req, res) => {
  const { email } = req.body;

  req.session.userId = user.id;

  res.send('/');
});

module.exports = router;
