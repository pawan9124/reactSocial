const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.country = !isEmpty(data.country) ? data.country : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";

  if (validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  if (validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  if (validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zipcode field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
