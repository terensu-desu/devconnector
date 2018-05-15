import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { registerUser } from "../../store/actions/";

class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		errors: {}
	};
	/*componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}
	}*/
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	onSubmit = event => {
		event.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		this.props.onRegisterUser(newUser, this.props.history);
	};

	render() {
		const errors = this.props.errors || {};
		if(this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">
								Create your DevConnector account
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup 
								name="name"
								placeholder="Name"
								value={this.state.name}
								error={errors.name}
								onChange={this.onChange}
								/>
								<TextFieldGroup 
								name="email"
								placeholder="Email Address"
								value={this.state.email}
								error={errors.email}
								type="email"
								onChange={this.onChange}
								info="This site uses Gravatar so if you want a profile image, use
										a Gravatar email"
								/>
								<TextFieldGroup 
								name="password"
								placeholder="Password"
								value={this.state.password}
								error={errors.password}
								type="password"
								onChange={this.onChange}
								/>
								<TextFieldGroup 
								name="password2"
								placeholder="Confirm password"
								value={this.state.password2}
								error={errors.password2}
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

Register.propTypes = {
	onRegisterUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onRegisterUser: (newUser, history) =>
			dispatch(registerUser(newUser, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(Register)
);

/*
	---How to use classnames library---
	className={classnames("form-control form-control-lg", {
		"is-invalid": errors.name
	})}
*/
