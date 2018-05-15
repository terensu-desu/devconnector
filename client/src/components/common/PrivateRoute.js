import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {} from "../../store/actions/";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
		}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
