const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * /posts -> GET -> All the posts
 */
router.get("/posts", isAuth, feedController.getPosts);

/**
 * /posts -> POST -> a feed post
 */
router.post(
  "/post",
  isAuth,
  //validation array
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

/**
 * /post/:postId -> GET -> 
 * get a post with a id passed as a named URL segments (as a parameter)
 */
router.get('/post/:postId', isAuth, feedController.getPostById);

/**
 * /post/:postId -> UPDATE -> Update a post based on id
 */
router.put('/post/:postId', isAuth,
//validation array
[
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
], feedController.updatePost);

/**
 * /post/:postId -> DELETE -> delete a post based on id
 */
 router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
