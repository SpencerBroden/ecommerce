const layout = require('../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <input form="${product.product_id}" type="hidden" name="product_name" value="${product.product_name}">
      <input form="${product.product_id}" type="hidden" name="price" value="${product.price}">
      <input form="${product.product_id}" type="hidden" name="price" value="${product.product_id}">
        <tr>
          <td>${product.product_name}</td>
          <td>${product.price}</td>
          <td>
              <input form="${product.product_id}" required class="input" type="text" name="quantity">
          </td>
          <td>
              <button form="${product.product_id}" class="button is-link">Order</button>
          </td>
        </tr>
    `;
    })
    .join('');

  return layout({
    content: `
    <form id="1" method="POST">
    <form id="2" method="POST">
    <form id="3" method="POST">
    <form id="4" method="POST">
    <form id="5" method="POST">
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
      </form>
      </form>
      </form>
      </form>
      </form>
      <div class="container">
        </br>
        <a href="/api/users" class="button is-primary">Check Customers</a>
        <a href="/api/hashs" class="button is-primary">Check Login Hashs</a>
        <a href="/api/products" class="button is-primary">Check Products</a>
        <a href="/api/orders" class="button is-primary">Check Orders</a>
      </div>
    `,
  });
};
