import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile } from "../../../store/actions";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import InputGroup from "../../common/InputGroup";

class CreateProfile extends Component {
	state = {
		displaySocialInputs: false,
		handle: "",
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: ""
	};

	onSubmit = event => {
		event.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram,
		};
		this.props.onCreateProfile(profileData, this.props.history);
	};
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const errors = this.props.errors || {};
		// Select options for "Status"
		const options = [
			{ label: "* Select Professional Status", value: 0 },
			{ label: "Developer", value: "Developer" },
			{ label: "Junior Developer", value: "Junior Developer" },
			{ label: "Senior Developer", value: "Senior Developer" },
			{ label: "Manager", value: "Manager" },
			{ label: "Student or Learning", value: "Student or Learning" },
			{ label: "Instructor or Teacher", value: "Instructor or Teacher" },
			{ label: "Intern", value: "Intern" },
			{ label: "Other", value: "Other" }
		];
		let socialInputs;
		if(this.state.displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup 
					placeholder="Twitter Profile URL"
					name="twitter"
					value={this.state.twitter}
					icon="fab fa-twitter"
					onChange={this.onChange}
					error={errors.twitter}
					/>
					<InputGroup 
					placeholder="Facebook Page URL"
					name="facebook"
					value={this.state.facebook}
					icon="fab fa-facebook"
					onChange={this.onChange}
					error={errors.facebook}
					/>
					<InputGroup 
					placeholder="Linkedin Profile URL"
					name="linkedin"
					value={this.state.linkedin}
					icon="fab fa-linkedin"
					onChange={this.onChange}
					error={errors.linkedin}
					/>
					<InputGroup 
					placeholder="YouTube Channel URL"
					name="youtube"
					value={this.state.youtube}
					icon="fab fa-youtube"
					onChange={this.onChange}
					error={errors.youtube}
					/>
					<InputGroup 
					placeholder="Instagram Page URL"
					name="instagram"
					value={this.state.instagram}
					icon="fab fa-instagram"
					onChange={this.onChange}
					error={errors.instagram}
					/>
				</div>
			)
		}
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">
								Let's get some information to make your profile stand out.
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									name="handle"
									placeholder="* Profile Handle"
									value={this.state.handle}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname, etc."
									onChange={this.onChange}
								/>
								<SelectListGroup
									name="status"
									value={this.state.status}
									error={errors.status}
									options={options}
									info="Your current career level."
									onChange={this.onChange}
								/>
								<TextFieldGroup
									name="company"
									placeholder="Company"
									value={this.state.company}
									error={errors.company}
									info="Your company name or employer."
									onChange={this.onChange}
								/>
								<TextFieldGroup
									name="website"
									placeholder="Website"
									value={this.state.website}
									error={errors.website}
									info="Your own website or company's website."
									onChange={this.onChange}
								/>
								<TextFieldGroup
									name="location"
									placeholder="Location"
									value={this.state.location}
									error={errors.location}
									info="City or city and state recommended (eg. Chicago, IL)."
									onChange={this.onChange}
								/>
								<TextFieldGroup
									name="skills"
									placeholder="Skills"
									value={this.state.skills}
									error={errors.skills}
									info="Please use only a comma to separate values (eg. HTML,CSS,JavaScript)."
									onChange={this.onChange}
								/>
								<TextFieldGroup
									name="githubusername"
									placeholder="GitHub Username"
									value={this.state.githubusername}
									error={errors.githubusername}
									info="If you want your GitHub repos and a GitHub linked, include your username here."
									onChange={this.onChange}
								/>
								<TextAreaFieldGroup
									name="bio"
									placeholder="Short Bio"
									value={this.state.bio}
									error={errors.bio}
									info="Say something about yourself."
									onChange={this.onChange}
								/>
								<div className="mb-3">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
									>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateProfile: (profileData, history) => dispatch(createProfile(profileData, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile));
