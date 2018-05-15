import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const selectListGroup = ({ name, value, error, info, options, onChange }) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));
	return (
		<div className="form-group">
			<select
				className={classnames("form-control form-control-lg", {
					"is-invalid": error
				})}
				name={name}
				value={value}
				onChange={onChange}
			>
				{selectOptions}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

selectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	options: PropTypes.array.isRequired,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default selectListGroup;
