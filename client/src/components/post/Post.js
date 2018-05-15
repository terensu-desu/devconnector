import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../store/actions/";

import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Aux from "../../hoc/Aux";
import Spinner from "../common/Spinner";

class Post extends Component {
	componentDidMount() {
		this.props.onGetPost(this.props.match.params.id);
	}

	render() {
		const { post, loading } = this.props.post;
		let postContent = <Spinner />;
		if(post && !loading && Object.keys(post).length !== 0) {
			postContent = (
				<Aux>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comments} />
				</Aux>
			)
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Link to="/feed" className="btn btn-light mb-3">
							Back to Feed
						</Link>
						{postContent}
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	onGetPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		post: state.post
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetPost: postId => dispatch(getPost(postId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);