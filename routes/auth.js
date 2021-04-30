const express = require('express');
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const signupTemplate = require('../views/auth/signup');

const db = require('../model');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Must be a valid email'),
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
    const user = await db.addCustomer(name, email, password, address, phone);

    res.redirect('/');
  }
);

module.exports = router;
