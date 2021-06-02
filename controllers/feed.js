const { clear } = require("console");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const Post = require("../models/post");
const { post } = require("../routes/feed");

/*********************************************************
 * GET the feed's posts => Get all the post for the news feed
 * ********************************************************/
exports.getPosts = (req, res, next) => {
  //fetch the feed post from the db
  Post.find()
    .then((feedPosts) => {
      res.status(200).json({
        message:
          feedPosts.length < 1 ? "There are no posts!" : "Feed Posts Returned.",
        posts: feedPosts,
      });
    })
    .catch();
};

/*********************************************************
 * POST Feed Post => create a new social media post on the DB
 * ********************************************************/
exports.createPost = (req, res, next) => {
  //Check validation of the post
  checkArrayOfErrors(req);

  if (!req.file) {
    const error = new Error("No file provided!");
    error.statusCode = 422;
    throw error;
  }

  //receive the values passed in the body
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path.replace("\\", "/");

  //Create a Post Schema
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
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
      postFindErrorHandler(post);

      res.status(200).json({
        message: "Feed post returned",
        post: post,
      });
    })
    .catch((err) => catchErrorHandling(err));
};

/************************************
 * PUT -> Edit and Update the post feed
 ************************************/
exports.updatePost = (req, res, next) => {
  //check for error
  checkArrayOfErrors(req);

  //get the id
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  //check if got image got update
  if (req.file) {
    imageUrl = req.file.path.replace("\\", "/");
  }
  if (!imageUrl) {
    const error = new Error("No file selected!");
    error.statusCode = 422;
    throw error;
  }

  //update in the DB
  Post.findById(postId)
    .then((post) => {
      //if the post is not found
      postFindErrorHandler(post);

      //clear image
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }

      //update
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Post updated",
        post: result,
      });
    })
    .catch((err) => catchErrorHandling(err));
};

/************************************
 * Helping functions
 ************************************/
//Catch error handler
const catchErrorHandling = (err) => {
  //throw an error in case it occur in the DB and hit the nex middleware
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

//Check for error
const checkArrayOfErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    //Custom error message
    const error = new Error("Invalid Post Method. Inconsistent Data!");
    error.statusCode = 422;
    throw error;
  }
};

//Post is check if found
const postFindErrorHandler = (post) => {
  if (!post) {
    const error = new Error("Feed post ID not found in the DB.");
    error.statusCode = 404;
    throw error;
  }
};

//clear image helper function
const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
