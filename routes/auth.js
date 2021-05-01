const express = require('express');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const signupTemplate = require('../views/auth/signup');
const saltRounds = 10;
const db = require('../model');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [
    check('name').trim(),
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Must be a valid email')
      .custom(async (email) => {
        const existingUser = await db.getCustomer({ email });
        if (existingUser) {
          throw new Error('Email in use');
        }
      }),
    check('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Must be between 4 and 20 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ errors }));
    }

    const { name, email, password, address, phone } = req.body;
    const customer = await db.addCustomer(name, email, address, phone);
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        db.addLogin(hash, email);
      });
    });

    res.redirect('/');
  }
);

module.exports = router;
