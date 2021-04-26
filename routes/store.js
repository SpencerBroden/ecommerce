const express = require('express');
const { handleErrors, requireAuth } = require('./middlewares');
const storeTemplate = require('../views/store/index');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = [{}];
  res.send(storeTemplate({ products }));
});

module.exports = router;
