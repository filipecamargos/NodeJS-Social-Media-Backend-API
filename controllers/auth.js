const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  //get all the req's data
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
};
