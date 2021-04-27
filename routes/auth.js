const express = require('express');
const signupTemplate = require('../views/auth/signup');

const db = require('../model');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  await db.addLogin(password, email);
  res.redirect('/');
});

module.exports = router;
