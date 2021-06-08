const { validationResult } = require("express-validator");

const User = require("../models/user");

/***************************************
 * PUT -> SIGN UP FOR THE SOCIAL MEDIA
 ***************************************/
exports.signup = (req, res, next) => {
  //check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    customErrorStatus("Validation Failed", 422, errors.array());
  }

  //get all the req's data
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

};

/******************************************
 * All the Helping Functions will go below
 *****************************************/
const customErrorStatus = (message, statusCode, errorData = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = errorData;
  throw error;
};
