const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  //data.title = !isEmpty(data.title) ? data.title : ''
  //data.email = !isEmpty(data.email) ? data.email : ''

  if (!validator.isUppercase(data.bibName)) {
    errors.bibName =  'BIB should be uppercase'
  }

  if (!validator.isAlphanumeric(data.bibName)) {
    bibName.bibName2 = 'BIB should be numeric'
  }

  if (!validator.isLength(data.bibName, { max: 10 })) {
    errors.bibName3 = 'Max BIB must be 10';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
