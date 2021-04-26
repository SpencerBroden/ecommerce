const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/auth');
const storeRouter = require('./routes/store');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({ keys: ['qwertyuiop987654321'] }));
app.use(authRouter);
app.use(storeRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT || 4000}`);
});
