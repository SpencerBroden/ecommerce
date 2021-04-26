const express = require('express');
const signupTemplate = require('../views/auth/signup');
const signinTemplate = require('../views/auth/signin');
const { handleErrors } = require('./middlewares');

const db = require('../model');

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirm,
  requireEmailExists,
  requireValidPassword,
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  //[requireEmail, requirePassword, requirePasswordConfirm],
  //handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    db.addLogin(password, email);
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

router.post(
  '/signin',
  //[requireEmailExists, requireValidPassword],
  //handleErrors(signinTemplate),
  async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    db.validate(loginEmail, loginPassword).then((valid) =>
      res.send(String(valid))
    );

    res.redirect('/');
  }
);

module.exports = router;
