const { Pool } = require('pg');

let connString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connString,
  ssl: { rejectUnauthorized: false },
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM login ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getLogin = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      'SELECT * FROM login WHERE email = $1',
      [email],
      (error, result) => {
        if (error) {
          throw error;
        } else if (result.rows.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    )
  );
};

const addLogin = (hash, email) => {
  pool.query(
    'INSERT INTO login(hash, email) VALUES($1, $2)',
    [hash, email],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

module.exports = {
  getUsers,
  addLogin,
  //addUser,
  //validate,
  getLogin,
};
