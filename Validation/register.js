const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	//convert empty feilds to an empty string so we can use validator function

	data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
	data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	//Name Checks

	if (Validator.isEmpty(data.firstName)) {
		errors.firstName = 'First Name field is required';
	}
	if (Validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last Name field is required';
	}

	//Email Check

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is Invalid';
	}

	//Password check

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'COnfirm Password field is required';
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
