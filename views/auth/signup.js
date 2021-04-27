const layout = require('../layout');
const { getError } = require('../helpers');

const register = () => {
  if (validateEmail(registerEmail) === false) {
    alert('Please enter a valid email address.');
  } else if (validatePassword(registerPassword) === false) {
    alert(
      'Passwords must contain at least one uppercase letter, one lowercase letter, and need to be at least 8 characters long.'
    );
  } else if (registerPassword.localeCompare(repeatPassword) !== 0) {
    alert('Passwords should match.');
  } else if (check === false) {
    alert('Please agree to the terms and conditions.');
  } else {
    Axios.post('https://ecs-cheng-alvis-api.herokuapp.com/email', {
      email: registerEmail,
    }).then((response) => {
      //console.log(String(response.data));
      if (String(response.data) === 'false') {
        Axios.post('https://ecs-cheng-alvis-api.herokuapp.com/register', {
          email: email,
          password: password,
        }).then((response) => {
          //console.log(response);
        });
      } else {
        //console.log(String(response.data));
        alert('This email is already in use.');
      }
    });
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
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
                <label class="label">Password Confirmation</label>
                <input required class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
                <p class="help is-danger">${getError(
                  errors,
                  'passwordConfirmation'
                )}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/signin">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `,
  });
};
