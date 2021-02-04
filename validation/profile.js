const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'This field is required';
  }

  // if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
  //   errors.text = 'Post must be between 10 and 300 characters';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
