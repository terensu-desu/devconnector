import axios from "axios";
import jwt_decode from "jwt-decode";
import * as types from "./types.js";
import setAuthToken from "../../utils/setAuthToken";

export const registerUser = (userData, history) => dispatch => {
	axios
		.post("/api/users/register", userData)
		.then(res => history.push("/login"))
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = userData => dispatch => {
	axios
		.post("/api/users/login", userData)
		.then(res => {
			// Save token to localStorage
			const {token} = res.data;
			localStorage.setItem("jwtToken", token);
			// Set token to auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => 
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = decoded => {
	return {
		type: types.SET_CURRENT_USER,
		payload: decoded
	}
}

export const logoutUser = () => dispatch => {
	// Remove the token from local storage
	localStorage.removeItem("jwtToken");
	// Remove the auth header
	setAuthToken(false);
	// Set current user to empty object which will set isAuthenticated to false
	// as per the !isEmpty(payload) check in reducer
	dispatch(setCurrentUser({}));
}