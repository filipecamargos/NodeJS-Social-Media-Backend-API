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

/**
 * /post/:postId -> GET -> 
 * get a post with a id passed as a named URL segments (as a parameter)
 */
router.get('/post/:postId', feedController.getPostById);

/**
 * /post/:postId -> UPDATE -> Update a post based on id
 */
router.put('/post/:postId',  //validation array
[
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
], feedController.updatePost);

/**
 * /post/:postId -> DELETE -> delete a post based on id
 */
router.delete('post/:postId', feedController.deletePost);

module.exports = router;
