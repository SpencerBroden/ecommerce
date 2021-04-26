const express = require('express');
const authRouter = require('./routes/auth');
const storeTemplate = require('./views/store/index');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRouter);

app.get('/', async (req, res) => {
  const products = [{}];
  res.send(storeTemplate({ products }));
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
