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
      <a href="/users" class="button is-primary">Check Customers</a>
      <a href="" class="button is-primary">Check Products</a>
      <a href="" class="button is-primary">Check Orders</a>
    </div>
    `,
  });
};

// </br>
// <div class="control">
//   <h1 class="subtitle">Checkout</h1>
// </div>
// <table class="table">
//   <thead>
//     <tr>
//       <th>Name</th>
//       <th>Price</th>
//       <th>Quantity</th>
//       <th>Remove</th>
//     </tr>
//   </thead>
//   <tbody>
//   ${checkoutProducts}
//   </tbody>
// </table>
// <button class="button is-primary">Checkout</button>
