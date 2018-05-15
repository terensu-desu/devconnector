import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../store/actions/";

import Experience from "./Experience";
import Education from "./Education";
import ProfileActions from "./ProfileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
	componentDidMount() {
		this.props.onGetCurrentProfile();
	}
	onDeleteClick = event => {
		event.preventDefault();
		this.props.onDeleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		if(profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			// Check if logged in user has profile data
			if(Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <Link to={"/profile/"+profile.handle}>{user.name}</Link>
						</p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
						<div>
							<button
							className="btn btn-danger"
							onClick={this.onDeleteClick}>
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				// They don't have a profile created
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>You have not set up a profile yet. Please add some info.</p>
						<Link 
						to="/dashboard/create-profile"
						className="btn btn-lg btn-info">
						Create Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">
								Dashboard
 							</h1>
 							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	onGetCurrentProfile: PropTypes.func.isRequired,
	onDeleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		profile: state.profile
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetCurrentProfile: () => dispatch(getCurrentProfile()),
		onDeleteAccount: () => dispatch(deleteAccount())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);