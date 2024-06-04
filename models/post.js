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

  skills: {
    type: [String],
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData", // Assuming you have a User model
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData", // Assuming you have a Student model
    },
  ],
  selectedApplicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData", // Selected students for the project
    },
  ],
  milestones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
    },
  ],
});

// module.exports = mongoose.model('Post', postSchema);
const Post = mongoose.model("Post", postSchema);
export default Post;
