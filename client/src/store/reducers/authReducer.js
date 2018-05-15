import * as types from "../actions/types.js";
import isEmpty from "../../validation/is-empty";

const initialState = {
	isAuthenticated: false,
	user: {}
};

const store = (state = initialState, action) => {
	switch(action.type) {
		case types.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default: 
			return state;
	}
};

export default store;