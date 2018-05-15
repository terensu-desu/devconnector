import * as types from "../actions/types.js";

const initialState = {
	posts: [],
	post: {},
	loading: false
};

const store = (state = initialState, action) => {
	switch(action.type) {
		case types.POSTS_LOADING: 
			return {
				...state,
				loading: true
			}
		case types.ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case types.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload),
			};
		case types.GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};
		case types.GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		default: 
			return state;
	}
};

export default store;