const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The post schema to be saved in the DB
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    creator: { type: Object, required: true },
  },
  { timestamps: true } //Construct a timeStamp automatically 
);

module.exports = mongoose.model('POST', postSchema)
