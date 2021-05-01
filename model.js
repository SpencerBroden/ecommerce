const { Pool } = require('pg');

let connString = process.env.DATABASE_URL;
const dbProducts;
const pool = new Pool({
  connectionString: connString,
  ssl: { rejectUnauthorized: false },
});

const getUsers = (request, response) => {
  pool.query(
    'SELECT * FROM customer ORDER BY customer_id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getLogins = (request, response) => {
  pool.query('SELECT * FROM login ORDER BY login_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProducts = (request, response) => {
  pool.query(
    'SELECT * FROM product ORDER BY product_id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      dbProducts = results.rows;
      response.status(200).json(results.rows);
    }
  );
};

const getOrders = (request, response) => {
  pool.query(
    'SELECT * FROM order_product ORDER BY order_id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
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
    pool.query('SELECT * FROM product', (error, result) => {
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
    'INSERT INTO customer(name, email, address, phone) VALUES($1, $2, $3, $4)',
    [name, email, address, phone],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
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
  addLogin,
  getUsers,
  getLogins,
  getProducts,
  getOrders,
  addCustomer,
  getProduct,
  getCustomer,
};
