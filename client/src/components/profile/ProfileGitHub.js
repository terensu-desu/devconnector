import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";

class ProfileGitHub extends Component {
	state = {
		clientId: "0890a854d03d89b9b26d",
		clientSecret: "1b393c2bbe6b9e8e8a33610d2fb88347b3eb49f8",
		count: 5,
		sort: "created: asc",
		repos: []
	};

	componentDidMount() {
		const { username } = this.props;
		const { count, sort, clientId, clientSecret } = this.state;
		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then(res => res.json())
			.then(data => {
				this.setState({ repos: data });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const { repos } = this.state;
		let repoItems = <Spinner />;
		if (repos.length > 0 && !repos.message) {
			repoItems = repos.map(repo => (
				<div key={repo.id} className="card card-body mb-2">
					<div className="row">
						<div className="col-md-6">
							<h4>
								<Link to={repo.html_url} className="text-info" target="_blank">
									{repo.name}
								</Link>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div className="col-md-6">
							<span className="badge badge-info mr-1">
								Stars: {repo.stargazers_count}
							</span>
							<span className="badge badge-secondary mr-1">
								Watchers: {repo.watchers_count}
							</span>
							<span className="badge badge-success">
								Forks: {repo.forks_count}
							</span>
						</div>
					</div>
				</div>
			));
		}
		if(repos.message) {
			repoItems = <h4>GitHub User Not Found</h4>;
		}
		return (
			<div>
				<hr />
				<h3 className="mb-4">Latest GitHub Repos</h3>
				{repoItems}
			</div>
		);
	}
}

ProfileGitHub.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileGitHub;
