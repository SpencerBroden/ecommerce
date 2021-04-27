const knex = require('knex');

const db = knex({
  client: 'pg',
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const handleRegister = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json('unable to register'));
};

module.exports = {
  handleRegister,
};
