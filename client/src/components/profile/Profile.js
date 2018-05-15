import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../store/actions/";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGitHub from "./ProfileGitHub";
import Spinner from "../common/Spinner";

class Profile extends Component {
	componentDidMount() {
		if(this.props.match.params.handle) {
			this.props.onGetProfileByHandle(this.props.match.params.handle);
		}
	}
	render() {
		if(!this.props.profile.profile) {
			this.props.history.push("/not-found");
		}
		const { profile } = this.props.profile;
		let profileContent = <Spinner />;
		if(profile) {
			profileContent = (
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-6">
							<Link className="btn btn-light mb-3 float-left" to="/profiles">
								Back to profiles
							</Link>
						</div>
						<div className="col-md-6"/>
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds
					education={profile.education}
					experience={profile.experience} />
					{profile.githubusername ? <ProfileGitHub username={profile.githubusername} /> : null}
				</div>
			);
		}
		return (
			<div className="container">
				<div className="row">
					{profileContent}
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	onGetProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetProfileByHandle: handle => dispatch(getProfileByHandle(handle))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);