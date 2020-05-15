import React from "react"
import PropTypes from "prop-types"
import NavBar from './NavBar'

class Welcome extends React.Component {
  render () {
    return (
      <div>
        {<NavBar/>}
        <div className='home-container'>
    		  <h1>Checklist</h1>
    		  <h3 className="slogan">Do what matters.</h3>
    		  <a href="/login" className='button'>Log In</a>
          <a href="/signup" className="button" id="sign-up">Sign Up</a>
        </div>
      </div>
    );
  }
}


export default Welcome

