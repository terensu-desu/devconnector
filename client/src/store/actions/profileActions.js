import axios from "axios";
import * as types from "./types.js";

// CREATE PROFILE
export const createProfile = (profileData, history) => dispatch => {
	dispatch(clearErrors());
	dispatch(setProfileLoading());
	axios.post("/api/profile", profileData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get("/api/profile")
		.then(res => 
			dispatch({
				type: types.GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err => 
			// It's possible for users to not have a profile set up,
			// so return with an empty object instead to allow them to set up
			dispatch({
				type: types.GET_PROFILE,
				payload: {}
			})
		);
};

// GET PROFILE BY HANDLE
export const getProfileByHandle = handle => dispatch => {
	dispatch(setProfileLoading());
	axios.get("/api/profile/handle/" + handle)
		.then(res => 
			dispatch({
				type: types.GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err => 
			// It's possible for users to not have a profile set up,
			// so return with an empty object instead to allow them to set up
			dispatch({
				type: types.GET_PROFILE,
				payload: null
			})
		);
};

// GET ALL PROFILES
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get("/api/profile/all")
		.then(res => 
			dispatch({
				type: types.GET_PROFILES,
				payload: res.data
			})
		)
		.catch(err => 
			// It's possible for users to not have a profile set up,
			// so return with an empty object instead to allow them to set up
			dispatch({
				type: types.GET_PROFILES,
				payload: null
			})
		);
};

// ACTIVATE LOADING SPINNER
export const setProfileLoading = () => {
	return {
		type: types.PROFILE_LOADING
	};
};

// CLEAR PROFILE
export const clearCurrentProfile = () => {
	return {
		type: types.CLEAR_CURRENT_PROFILE
	};
};

// ADD EXPERIENCE
export const addExperience = (newExperience, history) => dispatch => {
	dispatch(clearErrors());
	axios.post("/api/profile/experience", newExperience)
		.then(res => history.push("/dashboard"))
		.catch(err => 
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// ADD EDUCATION
export const addEducation = (newEducation, history) => dispatch => {
	dispatch(clearErrors());
	axios.post("/api/profile/education", newEducation)
		.then(res => history.push("/dashboard"))
		.catch(err => 
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// DELETE EXPERIENCE
export const deleteExperience = expId => dispatch => {
	axios.delete("/api/profile/experience/" + expId)
		.then(res => 
			// Call get profile, use the updated profile returned from the backend (res)
			dispatch({
				type: types.GET_PROFILE,
				payload: res.data
			}))
		.catch(err => 
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// DELETE EDUCATION
export const deleteEducation = eduId => dispatch => {
	axios.delete("/api/profile/education/" + eduId)
		.then(res => 
			// Call get profile, use the updated profile returned from the backend (res)
			dispatch({
				type: types.GET_PROFILE,
				payload: res.data
			}))
		.catch(err => 
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// DELETE ACCOUNT AND PROFILE
export const deleteAccount = () => dispatch => {
	if(window.confirm("Are you sure? This cannot be undone.")) {
		axios.delete("/api/profile")
			.then(res => {
				dispatch({
					type: types.SET_CURRENT_USER,
					payload: {}
				});
				dispatch({
					type: types.CLEAR_CURRENT_PROFILE
				});
			})
			.catch(err => 
				dispatch({
					type: types.GET_ERRORS,
					error: err.response.data
				})
			);
	}
};

const clearErrors = () => {
	return {
		type: types.CLEAR_ERRORS
	};
};