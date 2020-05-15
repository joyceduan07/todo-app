import React from "react"
import PropTypes from "prop-types"

class NavBar extends React.Component {
  render () {
    return (
      <div>
      	<nav className="navbar navbar-default navbar-fixed-top">
      		<div className="container-fluid">
      			<div className="navbar-header">
		        <ul className="nav navbar-nav">
					<li>
						<a href="/">
							<img alt="Brand" src="/assets/logo.png" width="20" height="20"/>
						</a>
					</li>
				</ul>
				</div>
			</div>
		</nav>
      </div>
    );
  }
}


export default NavBar