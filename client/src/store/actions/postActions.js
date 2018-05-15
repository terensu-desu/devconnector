import axios from "axios";
import * as types from "./types";

// ACTIVATE LOADING SPINNER
export const setPostsLoading = () => {
	return {
		type: types.POSTS_LOADING
	};
};

// ADD POST
export const addPost = postData => dispatch => {
	dispatch(clearErrors());
	axios
		.post("/api/posts/", postData)
		.then(res => 
			dispatch({
				type: types.ADD_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// ADD COMMENT
export const addComment = (postId, newComment) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${postId}`, newComment)
		.then(res => 
			dispatch({
				type: types.GET_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};


// GET ALL POSTS
export const getPosts = () => dispatch => {
	dispatch(setPostsLoading());
	axios
		.get("/api/posts/")
		.then(res => 
			dispatch({
				type: types.GET_POSTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_POSTS,
				payload: null
			})
		);
};

// GET INDIVIDUAL POST
export const getPost = postId => dispatch => {
	dispatch(setPostsLoading());
	axios
		.get(`/api/posts/${postId}`)
		.then(res => 
			dispatch({
				type: types.GET_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_POST,
				payload: null
			})
		);
};

export const deletePost = postId => dispatch => {
	axios
		.delete(`/api/posts/${postId}`)
		.then(res => 
			dispatch({
				type: types.DELETE_POST,
				payload: postId
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// DELETE COMMENT
export const deleteComment = (postId, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then(res => 
			dispatch({
				type: types.GET_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const addLike = postId => dispatch => {
	axios
		.post(`/api/posts/like/${postId}`)
		.then(res => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const removeLike = postId => dispatch => {
	axios
		.post(`/api/posts/unlike/${postId}`)
		.then(res => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		);
};

const clearErrors = () => {
	return {
		type: types.CLEAR_ERRORS
	};
};