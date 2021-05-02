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
      // not catching the email in use
      .custom(async (email) => {
        const existingUser = '';
        await db.getCustomer({ email }).then((response) => {
          existingUser = response.data;
        });
        if (existingUser) {
          throw new Error('Email in use');
        }
      }),
    check('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Must be between 4 and 20 characters')
      .optional({ nullable: true }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ errors }));
    }
    const { name, email, password, address, phone } = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        try {
          db.addCustomer(name, email, address, hash, phone);
        } catch {
          res.send(signupTemplate({ errors }));
        }
      });
    });

    res.redirect('/');
  }
);

module.exports = router;
