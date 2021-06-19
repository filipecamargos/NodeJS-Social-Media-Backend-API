const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authControler = require("../controllers/auth");
const User = require("../models/user");

/**
 * PUT -> Sing UP Router
 */
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid Email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already registred!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authControler.signup
);

/**
 * POST -> log the user in
 */
router.post('/login');

module.exports = router;

