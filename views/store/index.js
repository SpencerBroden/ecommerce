const layout = require('../layout');

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
          <form method="POST" action="/">
            <button class="button is-link">Add</button>
          </form>
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
    `,
  });
};
