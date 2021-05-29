const { validationResult } = require("express-validator");

const Post = require("../models/post");

/*********************************************************
 * GET POST => Get all the post for the news feed
 * ********************************************************/
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "152",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "image/questions.JPG",
        creator: {
          name: "John Dough",
        },
        date: new Date(),
      },
    ],
  });
};

/*********************************************************
 * POST METHOD => create a new social media post on the DB
 * ********************************************************/
exports.createPost = (req, res, next) => {

  //Check validation of the post
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    //Custom error message
    const error = new Error("Invalid Post Method. Inconsistent Data!")
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
    imageUrl: 'image/questions.JPG',
    creator: { name: "Jonh test" },
  });

  //Save in the DB and render the result
  post.save().then(result => {
    res.status(201).json({
      message: "Post created successfully!",
      post: result
    });
  }).catch( err => {
    //throw an error in case it occur in the DB and hit the nex middleware
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};
