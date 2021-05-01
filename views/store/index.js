const layout = require('../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
                <form method="POST">
                <input type="hidden" name="product_name" value="${product.product_name}">
                <input type="hidden" name="price" value="${product.price}">
                <input type="hidden" name="product_id" value="${product.product_id}">
                  <p>${product.product_name}</p>
                  <p>$${product.price}</p>
                  <div class="field has-addons has-addons-centered">
                  <input required class="input" placeholder="Quantity" type="text" name="quantity">
                  <button class="button is-link">Order</button>
                  </div>
                </form>
                </br>

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
      </table>
      <div class="container ">
      <div class="column is-one-quarter">
          ${renderedProducts}
      </div>
      </div>
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
