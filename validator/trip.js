const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateCreateTrip(data, isTravellerRequired) {
  let errors = {};
  data.to = !isEmpty(data.to) ? data.to : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.start = !isEmpty(data.start) ? data.start : "";
  data.destination = !isEmpty(data.destination) ? data.destination : "";
  data.travellers = !isEmpty(data.travellers) ? data.travellers : "";

  if (!validator.isISO8601(data.to)) {
    errors.to = "To date is invalid";
  }
  if (validator.isEmpty(data.to)) {
    errors.to = "To date is required";
  }
  if (!validator.isISO8601(data.from)) {
    errors.from = "From date is invalid";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  if (validator.isEmpty(data.start)) {
    errors.start = "Start field is required";
  }
  if (validator.isEmpty(data.destination)) {
    errors.destination = "Destination field is required";
  }
  if (isTravellerRequired) {
    if (validator.isEmpty(data.travellers)) {
      errors.travellers = "Travellers field is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
