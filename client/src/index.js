import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from './App';
import authReducer from "./store/reducers/authReducer";
import profileReducer from "./store/reducers/profileReducer";
import postReducer from "./store/reducers/postReducer";
import errorReducer from "./store/reducers/errorReducer";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer
});
const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const app = (
	<Provider store={store}>
		<App />
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
