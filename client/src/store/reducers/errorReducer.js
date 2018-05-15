import * as types from "../actions/types.js";

const initialState = {};

const store = (state = initialState, action) => {
	switch(action.type) {
		case types.GET_ERRORS:
			return action.payload;
		case types.CLEAR_ERRORS:
			return {};
		default: 
			return state;
	}
};

export default store;