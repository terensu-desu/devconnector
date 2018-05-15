import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../../store/actions";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";

class AddExperience extends Component {
	state = {
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
		disabled: false
	};

	onSubmit = event => {
		event.preventDefault();
		const newExperience = {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.onAddExperience(newExperience, this.props.history);
	};
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	onCheck = event => {
		this.setState(prevState => {
			return {
				disabled: !prevState.disabled,
				current: !prevState.current
			};
		});
	};

	render() {
		const errors = this.props.errors || {};
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link className="btn btn-light" to="/dashboard">
							Go back
						</Link>
						<h1 className="display-4 text-center">Add Experience</h1>
						<p className="lead text-center">
							Any job or position you have had in the past or current
						</p>
						<small className="d-block pb-3">* = required fields</small>

						<form onSubmit={this.onSubmit}>
							<TextFieldGroup
								name="company"
								placeholder="* Company"
								value={this.state.company}
								error={errors.company}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="title"
								placeholder="* Job Title"
								value={this.state.title}
								error={errors.title}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="location"
								placeholder="Location"
								value={this.state.location}
								error={errors.location}
								onChange={this.onChange}
							/>
							<h6>From Date</h6>
							<TextFieldGroup
								name="from"
								type="date"
								value={this.state.from}
								error={errors.from}
								onChange={this.onChange}
							/>
							<h6>To Date</h6>
							<TextFieldGroup
								name="to"
								type="date"
								value={this.state.to}
								error={errors.to}
								onChange={this.onChange}
								disabled={this.state.disabled ? "disabled" : ""}
							/>
							<div className="form-check mb-4">
								<input
									className="form-check-input"
									type="checkbox"
									name="current"
									value={this.state.current}
									checked={this.state.current}
									onChange={this.onCheck}
									id="current"
								/>
								<label htmlFor="current" className="form-check-label">
									Current Job
								</label>
							</div>
							<TextAreaFieldGroup
								name="description"
								placeholder="Position details"
								value={this.state.description}
								error={errors.description}
								onChange={this.onChange}
								info="Tell us about your position"
							/>
							<input
								type="submit"
								value="Submit"
								className="btn btn-info btn-block mt-4"
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onAddExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddExperience: (newExperience, history) =>
			dispatch(addExperience(newExperience, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(AddExperience)
);
