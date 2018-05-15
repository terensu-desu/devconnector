import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { loginUser } from "../../store/actions/";

class Login extends Component {
	state = {
		email: "",
		password: "",
		errors: {}
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	onSubmit = event => {
		event.preventDefault();
		const reqUser = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.onLoginUser(reqUser);
	};
	render() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
		const errors = this.props.errors || {};
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your DevConnector account
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup 
								name="email"
								placeholder="Email Address"
								value={this.state.email}
								error={errors.email}
								type="email"
								onChange={this.onChange}
								/>
								<TextFieldGroup 
								name="password"
								placeholder="Password"
								value={this.state.password}
								error={errors.password}
								type="password"
								onChange={this.onChange}
								/>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	onLoginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoginUser: (reqUser) => dispatch(loginUser(reqUser))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
