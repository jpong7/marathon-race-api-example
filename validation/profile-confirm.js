const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileConfirmInput(data) {
  //console.log("Data",data)
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.applicantBackground = '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'This field is required';
  }

  // if (Validator.isEmpty(data.applicantBackground)) {
  //   errors.applicantBackground = 'This field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
