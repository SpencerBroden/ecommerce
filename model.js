const { Pool } = require('pg');

let connString = process.env.DATABASE_URL;

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
  pool.query(
    'SELECT (customer_id, hash, email) FROM customer ORDER BY customer_id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getProducts = (request, response) => {
  pool.query(
    'SELECT * FROM product ORDER BY product_id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }

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

const addCustomer = (name, email, address, hash, phone) => {
  pool.query(
    'INSERT INTO customer(name, email, address, hash, phone) VALUES($1, $2, $3, $4, $5)',
    [name, email, address, hash, phone],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};
// const addLogin = (hash, email) => {
//   pool.query(
//     'INSERT INTO login(hash, email) VALUES($1, $2)',
//     [hash, email],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//     }
//   );
// };

const addOrder = (quantity, total, order_date, customer_id, product_id) => {
  return new Promise((resolve, reject) =>
    pool.query(
      'INSERT INTO order_product(quantity, total, order_date, customer_id, product_id) VALUES($1, $2, $3, $4, $5)',
      [quantity, total, order_date, customer_id, product_id],
      (error, results) => {
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

const listProducts = (request, response) => {
  return new Promise((resolve, reject) =>
    pool.query(
      'SELECT * FROM product ORDER BY product_id ASC',
      (error, results) => {
        if (error) {
          throw error;
        } else if (results.rows.length > 0) {
          resolve(results.rows);
        } else {
          resolve(false);
        }
      }
    )
  );
};

module.exports = {
  addOrder,
  listProducts,
  //addLogin,
  getUsers,
  getLogins,
  getProducts,
  getOrders,
  addCustomer,
  getProduct,
  getCustomer,
};
