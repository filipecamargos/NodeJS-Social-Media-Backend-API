const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

/**
 * /posts -> GET -> All the posts
 */
router.get("/posts", feedController.getPosts);

/**
 * /posts -> POST -> a feed post
 */
router.post(
  "/post",
  //validation array
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

module.exports = router;
