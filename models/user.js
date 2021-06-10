/*********************************
 * User Model for the Application
 *********************************/

 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

//creat the user schema
const useSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, default: 'Hello World!' },
  posts: { type: Schema.Types.ObjectId, ref: "Post" },
});

//export the user schema
module.exports = mongoose.model("User", useSchema);
