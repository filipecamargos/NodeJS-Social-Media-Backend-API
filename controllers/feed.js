const { validationResult } = require("express-validator");

const Post = require("../models/post");

/*********************************************************
 * GET the feed's posts => Get all the post for the news feed
 * ********************************************************/
exports.getPosts = (req, res, next) => {
  //fetch the feed post from the db
  Post.find()
  .then(feedPosts => {
    res.status(200).json({
      message: (feedPosts.length < 1)  ? 'There are no posts!' : 'Feed Posts Returned.',
      posts: feedPosts,
    })
  })
  .catch();
};

/*********************************************************
 * POST Feed Post => create a new social media post on the DB
 * ********************************************************/
exports.createPost = (req, res, next) => {
  //Check validation of the post
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    //Custom error message
    const error = new Error("Invalid Post Method. Inconsistent Data!");
    error.statusCode = 422;
    throw error;
  }

  //receive the values passed in the body
  const title = req.body.title;
  const content = req.body.content;

  //Create a Post Schema
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/questions.JPG",
    creator: { name: "Jonh test" },
  });

  //Save in the DB and render the result
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => catchErrorHandling(err));
};

/*********************************************************
 * GET a feed post => get it by id passed in the url
 * ********************************************************/
exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;

  //use the POST model to find the post
  Post.findById(postId)
    .then((post) => {
      //error handler
      if (!post) {
        const error = new Error("Feed post ID not found in the DB.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Feed post returned",
        post: post,
      });
    })
    .catch((err) => catchErrorHandling(err));
};

/************************************
 * Helping functions
 ************************************/
const catchErrorHandling = (err) => {
  //throw an error in case it occur in the DB and hit the nex middleware
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};
