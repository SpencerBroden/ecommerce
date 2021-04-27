const express = require('express');
const signupTemplate = require('../views/auth/signup');

const db = require('../model');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  db.addLogin(password, email);
  res.redirect('/');
});

module.exports = router;
