import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  clearCurrentProfile
} from "./store/actions/";

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from "./components/dashboard/create-profile/CreateProfile";
import EditProfile from "./components/dashboard/edit-profile/EditProfile";
import AddExperience from "./components/dashboard/add-experience/AddExperience";
import AddEducation from "./components/dashboard/add-education/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import NotFound from "./components/notfound/NotFound";
import './App.css';

class App extends Component {
  render() {
    // Check if user has valid token from last log in
    if(localStorage.jwtToken) {
      // Set auth token header
      setAuthToken(localStorage.jwtToken);
      // Decode the token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.props.onSetCurrentUser(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if(decoded.exp < currentTime) {
        // Logout user
        this.props.onLogoutUser();
        // TODO: Clear current profile
        this.props.onClearCurrentProfile();
        // Redirect to login page: 
        window.location.href = "/login";
      }
    }
    
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboard/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/dashboard/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/dashboard/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/dashboard/add-education" component={AddEducation} />
              <PrivateRoute exact path="/feed" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  onSetCurrentUser: PropTypes.func.isRequired,
  onLogoutUser: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    onSetCurrentUser: (decoded) => dispatch(setCurrentUser(decoded)),
    onLogoutUser: () => dispatch(logoutUser()),
    onClearCurrentProfile: () => dispatch(clearCurrentProfile())
  };
};

export default connect(null, mapDispatchToProps)(App);
