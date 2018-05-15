import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../store/actions/";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CommentForm extends Component {
	state = { text: "" };

	onSubmit = event => {
		event.preventDefault();
		const { user } = this.props.auth;
		const { postId } = this.props;
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};
		this.props.onAddComment(postId, newComment);
		this.setState({ text: "" });
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const errors = this.props.errors || {};
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Add a comment</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									placeholder="Reply to post"
									name="text"
									value={this.state.text}
									onChange={this.onChange}
									error={errors.text}
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	onAddComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddComment: (postId, newComment) => dispatch(addComment(postId, newComment))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
