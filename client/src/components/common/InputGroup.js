import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const inputGroup = ({
	name,
	placeholder,
	value,
	error,
	icon,
	type,
	onChange
}) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input
				className={classnames("form-control form-control-lg", {
					"is-invalid": error
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

inputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	icon: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

inputGroup.defaultProps = {
	type: "text"
};

export default inputGroup;
