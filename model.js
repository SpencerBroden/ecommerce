const { Pool } = require('pg');

let connString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connString,
  ssl: { rejectUnauthorized: false },
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM customer ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCustomer = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      'SELECT * FROM customer WHERE email = $1',
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

const getProduct = () => {
  return new Promise((resolve, reject) =>
    pool.query('SELECT * FROM products', (error, result) => {
      if (error) {
        throw error;
      } else if (result.rows.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  );
};

const addCustomer = (name, email, password, address, phone) => {
  pool.query(
    'INSERT INTO customer(name, email, password, address, phone) VALUES($1, $2, $3, $4, $5)',
    [name, email, password, address, phone],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

const addCart = (req) => {
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
  addCustomer,
  getProduct,
  getCustomer,
};
