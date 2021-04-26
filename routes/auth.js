const express = require('express');
const bcrypt = require('bcrypt');
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

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    })
  );
};

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirm],
  handleErrors(signupTemplate),
  async (req, res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(String(req.body.password), 10);

    db.addUser(password, email);
    db.addUser(username, email);

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
  [requireEmailExists, requireValidPassword],
  handleErrors(signinTemplate),
  async (req, res) => {
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    db.validate(loginEmail, loginPassword).then((valid) =>
      res.send(String(valid))
    );

    res.redirect('/');
  }
);

module.exports = router;
