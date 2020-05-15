import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import NavBar from './NavBar'

class SessionInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      valid_user: true
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        email: value
      }
    });
  }
  handlePassChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        password: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    var email = this.state.email;
    var password = this.state.password;

    var self = this;

    axios.post('/login', {
        utf8: "&#x2713;",
        authenticity_token: "NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo=",
        session: {
          email: email,
          password: password
        }
      }
    )
    .then(function (response) {
      // invalid user
      if (response.data.data == '/tasks') {
        window.location = response.data.data;
      }
      else {
        self.setState(function () {
          return {
            email: '',
            password: '',
            valid_user: false,
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render () {
    var email = this.state.email;
    var password = this.state.password;
    var valid_user = this.state.valid_user;

    return (
      <div className="login-container">
        <h2 className="signup-padding">Log In</h2>

        {!valid_user &&
            <div><p className="invalid-message">Invalid email or password.</p></div>}

        <div className= "col-md-4 center-div">
          <form onSubmit={this.handleSubmit}>
          <input name="utf8" type="hidden" value="&#x2713;" />
          <input name="authenticity_token" type="hidden" value="NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo=" />
            
            <label>Email</label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />

            <label>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              value={this.state.password}
              onChange={this.handlePassChange}
            />

            <input
              className="button"
              type="submit"
              id= 'submit'
              value="Log In"
              disabled={!(email && password)}
            />
          </form>
        </div>
      </div>
    )
  }
}

class LogIn extends React.Component {
  render () {
    return (
      <div>
        {<NavBar />}
        {<SessionInput />}
      </div>
    );
  }
}

export default LogIn