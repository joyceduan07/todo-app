import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

class NavListsStatic extends React.Component {
  constructor(props){
	super(props);
	this.newList = this.newList.bind(this);
  }
  newList() {
  	window.location = "/tasks/add-list"
  }
  render () {
  	var self = this;
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
				<ul className="nav navbar-nav navbar-right">
					<li id="nav-button"><button className="add-list-button navbar-btn" onClick={self.newList}>New List</button></li>
					<li className="dropdown">
			        	<a className="dropdown-toggle" data-toggle="dropdown" href="#">{this.props.username.charAt(0).toUpperCase() + this.props.username.substr(1,this.props.username.indexOf(' '))}
			        		<span className="caret"></span>
			        	</a>
			        	<ul className="dropdown-menu">
				          	<li><a href="/logout" data-method="delete">Log Out</a></li>
			        	</ul>
			      	</li>
				</ul>
			</div>
		</nav>
      </div>
    );
  }
}

NavListsStatic.propTypes = {
	username: PropTypes.string.isRequired,
}

export default NavListsStatic