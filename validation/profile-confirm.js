const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileConfirmInput(data) {
  console.log('Data', data)
  let errors = {}

  data.title = !isEmpty(data.title) ? data.title : ''

  if (validator.isEmpty(data.title)) {
    errors.title = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
