const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

//Import the config file
const CONFIG = require("./private");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

//Configure all for storage
const { v4: uuidv4 } = require('uuid')
 
const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4())
    }
});

//File filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

//Register a body parser
app.use(express.json());

//Regsister the storage and filter coming from the image name as request
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

//Construct an static absolut path to the image folder
//_dirname gives access to the app path
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Registred Routes
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

//Router error case
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//Set the connection
mongoose
  .connect(CONFIG.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
