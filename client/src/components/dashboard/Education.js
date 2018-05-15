import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../store/actions/";

class Education extends Component {
	onDeleteClick = eduId => {
		this.props.onDeleteEducation(eduId);
	};
	render() {
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment> - 
					{edu.to === null ? (
						" Now"
					) : (
						<Moment format="YYYY/MM/DD">{edu.to}</Moment>
					)}
				</td>
				<td>
					<button 
					className="btn btn-danger"
					onClick={() => this.onDeleteClick(edu._id)}>
					Delete
					</button>
				</td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-4">Education History</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Field of Study</th>
							<th />
						</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	onDeleteEducation: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
	return {
		onDeleteEducation: eduId => dispatch(deleteEducation(eduId))
	};
};

export default connect(null, mapDispatchToProps)(Education);