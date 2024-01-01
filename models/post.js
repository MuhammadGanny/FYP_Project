// const mongoose = require('mongoose');
import mongoose  from 'mongoose';

const postSchema = new mongoose.Schema({
    projectHeading: {
        type: String,
        required: true,
      },
      projectDescription: {
        type: String,
        required: true,
      },
  skills: String,
  author: String,
  
});

// module.exports = mongoose.model('Post', postSchema);
const Post = mongoose.model('Post', postSchema);
export default Post;
