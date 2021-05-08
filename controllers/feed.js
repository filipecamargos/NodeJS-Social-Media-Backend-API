const { validationResult } = require("express-validator/check");

const Post = require("../models/post");

//GET POST
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

//Creat a post
exports.createPost = (req, res, next) => {
  
  //Check validation of the post
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(422).json({
      message: "Invalid Post Method. Inconsistent Data!",
      errors: errors.array(),
    });
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
    console.log(result);
    res.status(201).json({
      message: "Post created successfully!",
      post: result
    });
  }).catch( err => {
    console.log(err);
  })
};
