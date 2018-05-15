import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../../store/actions";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";

class AddEducation extends Component {
	state = {
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
		disabled: false
	};

	onSubmit = event => {
		event.preventDefault();
		const newEducation = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.onAddEducation(newEducation, this.props.history);
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
						<h1 className="display-4 text-center">Add Education</h1>
						<p className="lead text-center">
							Add any school, bootcamp, etc. that you have attended.
						</p>
						<small className="d-block pb-3">* = required fields</small>

						<form onSubmit={this.onSubmit}>
							<TextFieldGroup
								name="school"
								placeholder="* School"
								value={this.state.school}
								error={errors.school}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="degree"
								placeholder="* Degree"
								value={this.state.degree}
								error={errors.degree}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="fieldofstudy"
								placeholder="* Field of study"
								value={this.state.fieldofstudy}
								error={errors.fieldofstudy}
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
									Currently attending
								</label>
							</div>
							<TextAreaFieldGroup
								name="description"
								placeholder="Program description"
								value={this.state.description}
								error={errors.description}
								onChange={this.onChange}
								info="Tell us about your program"
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

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onAddEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddEducation: (newEducation, history) =>
			dispatch(addEducation(newEducation, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(AddEducation)
);
