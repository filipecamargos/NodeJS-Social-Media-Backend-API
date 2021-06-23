const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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

  //hash the password
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      //create a new user
      const user = new User({
        email: email,
        name: name,
        password: hashedPassword,
      });

      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result.userId });
    })
    .catch((error) => customErrorStatus("Error in the operation!", 500));
};

/**********************************************
 * POST login the user
 **********************************************/
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser; 

  User.findOne({email: email})
  .then(user => {
    //check if it is a valid email
    if (!user) {
      customErrorStatus("Email not Found!", 401);
    }
    loadedUser = user;
    return bcrypt.compare(password, user.password);
  })
  .then(isEqual => {
    //check if it is a valid password
    if (!isEqual) {
      customErrorStatus("Wrong Email or Password!", 401);
    }
    //Generate a webToken
    const token = jwt.sign({
      email: loadedUser.email,
      userId: loadedUser._id.toString()
    }, 'pageSecretForLoadingaToken', {expiresIn: '1h'});
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString()
    });
  })
  .catch((error) => customErrorStatus("Error in the operation!", 500));
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
