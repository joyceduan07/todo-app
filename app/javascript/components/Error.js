import React from "react"
import PropTypes from "prop-types"
import NavBar from './NavBar'

class Error extends React.Component {
  render () {
    return (
      <div>
        {<NavBar/>}
        <h3 className='first-item'>Page not found.</h3>
      </div>
    );
  }
}


export default Error
