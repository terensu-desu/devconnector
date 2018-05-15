import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../store/actions/";

import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";

class Posts extends Component {
	componentDidMount() {
		this.props.onGetPosts();
	}
	render() {
		const { posts, loading } = this.props.post;
		let postContent = <Spinner />;
		if(posts && !loading) {
			postContent = <PostFeed posts={posts} />;
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<PostForm />
						{postContent}
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	onGetPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		post: state.post,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetPosts: () => dispatch(getPosts())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);