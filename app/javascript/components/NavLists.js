import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

class NavLists extends React.Component {
  constructor(props){
	super(props);
	this.newList = this.newList.bind(this);
  }
  newList() {
  	window.location = "/tasks/add-list"
  }
  render () {
  	var self = this;
  	var category = this.props.category;
  	var lists = this.props.lists;
  	console.log("cat in navlists", category);
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
				<ul className="nav navbar-nav">

	

					{category == 'all' && 
			        	<li key="all" style={{background: '#B0B0B0' }}><a href="javascript:void(0);" onClick={self.props.onSelect.bind(null, "all")}>All</a></li> }

			        {category != 'all' &&
			        	<li key="all"><a href="javascript:void(0);" onClick={self.props.onSelect.bind(null, "all")}>All</a></li>}

					{lists.map(function(list) {
			        	return (
			        		<li key={list} style={list == category ? {background: '#B0B0B0' } : null}>
			        			<a href="javascript:void(0);" onClick={self.props.onSelect.bind(null, list)}>{list.charAt(0).toUpperCase() + list.substr(1)}</a>
			        		</li>
			        	)
			        })} 



				</ul>
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

NavLists.propTypes = {
	username: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	lists: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired,
}

NavLists.defaultProps = {
	category: 'all',
}

export default NavLists