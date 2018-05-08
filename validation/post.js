const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
	let errors = {};
	// data.text wouldn't be a string if it's empty, use our middleware to check
	data.text = !isEmpty(data.text) ? data.text : "";

	if(!Validator.isLength(data.text, {min: 10, max: 300})) {
		errors.text = "Post must be between 10 and 300 characters.";
	}

	if(Validator.isEmpty(data.text)) {
		errors.text = "Text field is required.";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
};