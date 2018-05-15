import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../store/actions/";

import ProfileItem from "./ProfileItem";
import Spinner from "../common/Spinner";

class Profiles extends Component {
	componentDidMount() {
		this.props.onGetProfiles();
	}
	render() {
		const { profiles } = this.props.profile;
		let profileItems = <Spinner />;
		if(profiles) {
			if(profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItem key={profile._id} profile={profile} />
				));
			} else {
				profileItems = <h4>No profiles found!</h4>;
			}
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="display-4 text-center">Developer Profiles</h1>
						<p className="lead text-center">Browse and connect with developers</p>
						{profileItems}
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	onGetProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetProfiles: () => dispatch(getProfiles())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);