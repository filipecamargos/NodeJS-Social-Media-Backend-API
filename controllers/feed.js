const {validationResult} = require('express-validator/check')

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
        message: 'Invalid Post Method. Inconsistent Data!',
        errors: errors.array()
      })
  }

  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
      creator: { name: "Jonh test" },
      createdAt: new Date(),
    },
  });
};
