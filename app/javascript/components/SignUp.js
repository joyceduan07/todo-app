import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import NavBar from './NavBar'

class UserInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      email_valid: false,
      password_valid: false,
      confirm_password_valid: false,
      email_taken: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        name: value
      }
    });
  }
  handleEmailChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        email: value
      }
    });
    if (/[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+/.test(value)) {
      this.setState(function () {
        return {
          email_valid: true
        }
      });
    }
    else {
      this.setState(function () {
        return {
          email_valid: false
        }
      });
    }
  }
  handlePassChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        password: value
      }
    });
    if (value.length >= 6) {
      this.setState(function () {
        return {
          password_valid: true
        }
      });
    }
    else {
      this.setState(function () {
        return {
          password_valid: false
        }
      });
    }

    if (value == this.state.password_confirmation) {
      this.setState(function () {
        return {
          password_confirmation_valid: true
        }
      });
    }
    else {
      this.setState(function () {
        return {
          password_confirmation_valid: false
        }
      });
    }
  }
  handlePassConfirmChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        password_confirmation: value
      }
    });
    if (value ==  this.state.password && this.state.password_valid) {
      this.setState(function () {
        return {
          password_confirmation_valid: true
        }
      });
    }
    else {
      this.setState(function () {
        return {
          password_confirmation_valid: false
        }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var name = this.state.name;
    var email = this.state.email;
    var password = this.state.password;
    var password_confirmation = this.state.password_confirmation;

    var self = this;

    axios.post('/signup', {
        utf8: "&#x2713;",
        authenticity_token: "NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo=",
        user: {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      }
    )
    .then(function (response) {
      // change state so automatically renders errors
      console.log(response.data.data);
      if (response.data.data == '/') {
        window.location = response.data.data;
      }
      else {
        self.setState(function () {
          return {
            email: '',
            email_taken: true,
            password: '',
            password_confirmation: '',
            password_valid: false,
            password_confirmation_valid: false
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });   
  }
  render () {
    var name = this.state.name;
    var email_valid = this.state.email_valid;
    var password_valid = this.state.password_valid;
    var password_confirmation_valid = this.state.password_confirmation_valid;
    var email_taken = this.state.email_taken

    return (
      <div className= "col-md-4 center-div">
        <form onSubmit={this.handleSubmit}>          
          <label>Name</label>
          <input
            id="name"  
            type="text"
            autoComplete="off"
            maxLength="50"
            value={this.state.username}
            onChange={this.handleNameChange}
          />

          {!name &&
          <p className="invalid">Enter a name.</p>}

          {name &&
            <p className="valid">Nice name!</p>}

          <label>Email</label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />

          {!email_valid && !email_taken && 
            <p className="invalid">Enter a valid email.</p>}

          {email_valid && !email_taken &&
            <p className="valid">Looks good!</p>}

          {email_taken && <p className="invalid">This email has already been used.</p>}

          <label>Password</label>
          <input
            id="password"
            type="password"
            autoComplete="off"
            value={this.state.password}
            onChange={this.handlePassChange}
          />

          {!password_valid &&
            <p className="invalid">Minimum 6 characters.</p>}

          {password_valid &&
            <p className="valid">Great!</p>}

          <label>Confirm Password</label>
          <input
            id="password_confirmation"
            type="password"
            autoComplete="off"
            value={this.state.password_confirmation}
            onChange={this.handlePassConfirmChange}
          />

          {!password_confirmation_valid &&
            <p className="invalid">Passwords do not match.</p>}

          {password_confirmation_valid &&
            <p className="valid">Passwords match!</p>}

          <input
            className="button"
            type="submit"
            id="submit"
            value="Create my account"
            disabled={!(this.state.name && email_valid && password_valid && password_confirmation_valid)}
          />
        </form>
      </div>
    )
  }
}

class SignUp extends React.Component {
  render () {
    return (
    	<div>
    		{<NavBar/>}
    		<div className="signup-container">
		      <h2 className="signup-padding">Sign Up</h2>
		      {<UserInput />}
		    </div>
    	</div>
    );
  }
}

export default SignUp