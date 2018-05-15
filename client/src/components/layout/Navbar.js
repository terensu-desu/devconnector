import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, clearCurrentProfile } from "../../store/actions";

class Navbar extends Component {
	handleLogoutClick = event => {
		event.preventDefault();
		this.props.onLogoutUser();
		this.props.onClearCurrentProfile();
	};
	render() {
		let authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
	        <Link className="nav-link" to="/register">Sign Up</Link>
	      </li>
	      <li className="nav-item">
	        <Link className="nav-link" to="/login">Login</Link>
	      </li>
      </ul>
		);
		if(this.props.auth.isAuthenticated) {
			authLinks = (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
		        <Link className="nav-link" to="/feed">Post Feed</Link>
		      </li>
					<li className="nav-item">
		        <Link className="nav-link" to="/dashboard">Dashboard</Link>
		      </li>
					<li className="nav-item">
		        <a 
		        className="nav-link" 
		        href="#!"
		        onClick={this.handleLogoutClick}>
		        	<img 
		        	className="rounded-circle"
		        	style={{ width: "25px", marginRight: "5px" }}
		        	src={this.props.auth.user.avatar} 
		        	alt="Avatar" 
		        	title="You must have a gravatar connected to your email to display your image here."/>
		        	Logout
		        </a>
		      </li>
		     </ul>
			);
		}
		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
		    <div className="container">
		      <Link className="navbar-brand" to="/">DevConnector</Link>
		      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
		        <span className="navbar-toggler-icon"></span>
		      </button>

		      <div className="collapse navbar-collapse" id="mobile-nav">
		        <ul className="navbar-nav mr-auto">
		          <li className="nav-item">
		            <Link className="nav-link" to="/profiles"> Developers
		            </Link>
		          </li>
		        </ul>
		        {authLinks}
		      </div>
		    </div>
		  </nav>
		);
	}
}

Navbar.propTypes = {
	onLogoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogoutUser: () => dispatch(logoutUser()),
		onClearCurrentProfile: () => dispatch(clearCurrentProfile())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);