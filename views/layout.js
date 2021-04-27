module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      </head>

      <body class="admin">
        <header>
          <nav class="navbar navbar-bottom">
            <div class="container navbar-container">
              <div>
                <a href="/">
                  <h3 class="title">Ecommerce</h3>
                </a>
              </div>
              <div class="navbar-item">
                <div class="navbar-buttons">
                  <div class="navbar-item">
                    <a href="/signin" class="button is-link">Sign In</a>
                  </div> 
                </div> 
              </div>
              <div class="navbar-item">
              <div class="navbar-buttons">
                <div class="navbar-item">
                  <a href="/signup" class="button is-link">Sign Up</a>
                </div> 
              </div> 
            </div>
            </form>
            </div>
          </nav>
        </header>
        <div class="container">
          ${content}
        </div>
      </body>
    </html>
  `;
};
