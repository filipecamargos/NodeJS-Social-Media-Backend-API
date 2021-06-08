/*********************************
 * User Model for the Application
 *********************************/

const moongose = require("mongoose");
const Schema = moongose.Schema();

//creat the user schema
const useSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  posts: { type: Schema.Types.ObjectId, ref: "Post" },
});

//export the user schema
module.exports = moongose.model("User".useSchema);
