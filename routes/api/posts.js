const express = require("express");
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");

const validatePostInput = require("../../validation/post");

const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const keys = require("../../config/keys");

// @router GET api/posts/test
// @desc   Test posts route
// @access Public
router.get("/test", (req, res) => res.json({msg: "Posts works"}));

// @router GET api/posts/
// @desc   View posts
// @access Public
router.get("/", (req, res) => {
	Post.find()
		.sort({date: -1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({nopostsfound: "No posts found."}));
});

// @router GET api/posts/:id
// @desc   View post by id
// @access Public
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({nopostfound: "No posts found by that ID."}));
});

// @router POST api/posts/
// @desc   Create a post
// @access Private
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
	const {errors, isValid} = validatePostInput(req.body);
	if(!isValid) {
		return res.status(400).json(errors);
	}
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});
	newPost.save().then(post => res.json(post));
});

// @router Delete api/posts/:id
// @desc   Delete post 
// @access Public
router.delete("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// Check for post ownership
					if(post.user.toString() !== req.user.id) {
						return res.status(401).json({notauthorized: "User not authorized."});
					}
					// Delete
					post.remove().then(() => res.json({success: true}));
				})
				.catch(err => res.status(404).json({postnotfound: "Post not found."}));
		});
});

// @router POST api/posts/like/:id
// @desc   Like post 
// @access Private
router.post("/like/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
						return res.status(400).json({alreadyliked: "User aleady liked this post."});
					}
					// Add user to likes array
					post.likes.unshift({user: req.user.id});
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({postnotfound: "Post not found."}));
		});
});

// @router POST api/posts/unlike/:id
// @desc   Unlike post 
// @access Private
router.post("/unlike/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
						return res.status(400).json({notliked: "User has not liked this post yet."});
					}
					// Remove user from likes array
					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);
					post.likes.splice(removeIndex, 1);
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({postnotfound: "Post not found."}));
		});
});

// @router POST api/posts/comment/:id
// @desc   Add comment to post
// @access Private
router.post("/comment/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	const {errors, isValid} = validatePostInput(req.body);
	if(!isValid) {
		return res.status(400).json(errors);
	}
	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};
			// Add to comments array
			post.comments.unshift(newComment);
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound: "Post not found."}));
});

// @router DELETE api/posts/comment/:id/:comment_id
// @desc   Delete comment from post 
// @access Private
router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", {session: false}), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			// Check if it exists
			if(post.comments
				.filter(comment => comment._id.toString() === req.params.comment_id)
				.length === 0) {
					return res.status(404).json({commentnotfound: "Comment not found."});
			}
			// Get remove index to use when splicing
			const removeIndex = post.comments
				.map(item => item._id.toString())
				.indexOf(req.params.comment_id);
			// Remove comment from array
			post.comments.splice(removeIndex, 1);
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound: "Post not found."}));
});

module.exports = router;