// const mongoose = require('mongoose');
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  projectHeading: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  // skills: String,
  // author: String,
  skills: {
    type: String,
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData", // Assuming you have a Student model
    },
  ],
});

// module.exports = mongoose.model('Post', postSchema);
const Post = mongoose.model("Post", postSchema);
export default Post;
