const layout = require('../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <tr>
        <td>${product.product_name}</td>
        <td>${product.price}</td>
        <td>
            <input type="text" name="quantity">
        </td>
        <td>
            <button class="button is-link">Order</button>
        </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>  
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
      <div class="container">
      </br></br>
      <a href="/api/users" class="button is-primary">Check Customers</a>
      <a href="/api/hashs" class="button is-primary">Check Login Hashs</a>
      <a href="/api/products" class="button is-primary">Check Products</a>
      <a href="/api/orders" class="button is-primary">Check Orders</a>
    </div>
    `,
  });
};
