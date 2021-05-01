const layout = require('../layout');
const { getError } = require('../helpers');
module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <small style="color: red;">WARNING: Do not use real information</small>
              <div class="field">
                <label class="label">Name</label>
                <input required class="input" placeholder="Name" name="name" />
                <p class="help is-danger">${getError(errors, 'name')}</p>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Address</label>
                <input required class="input" placeholder="Enter your address"" name="address" type="text" />
                <p class="help is-danger">${getError(errors, 'address')}</p>
              </div> 
              <div class="field">
                <label class="label">Phone</label>
                <input required class="input" placeholder="Enter your phone number" type="tel" id="phone" name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" /> 
                <small>Format: 123-456-7890</small>
                <p class="help is-danger">${getError(errors, 'phone')}</p>
              </div>                           
              <button class="button is-primary">Submit</button>
            </form>
            <a href="">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `,
  });
};
