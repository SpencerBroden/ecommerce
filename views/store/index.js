const layout = require('../layout');

let cart;

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
            <input type="text" id="quantity" name="quantity">
        </td>
        <td>
            <button class="button is-link">Add</button>
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
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
      <div class="container">
      </br></br>
      <a href="/api/users" class="button is-primary">Check Customers</a>
      <a href="/api/users" class="button is-primary">Check Login Hash</a>
      <a href="/api/products" class="button is-primary">Check Products</a>
      <a href="/api/orders" class="button is-primary">Check Orders</a>
    </div>
    `,
  });
};
