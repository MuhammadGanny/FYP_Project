import Post from '../models/post.js'
// const Post = require('../models/post'); 


const createPost = async (req, res) => {
  try {
    const { projectHeading, projectDescription, skills, author  } = req.body;

    
    const newPost = new Post({
      projectHeading,
      projectDescription,
      skills, 
      author,
    });

    const savedPost = await newPost.save();

    if (savedPost) {
      res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } else {
      res.status(500).json({ error: 'Failed to save the post' });
    }
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
};

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find(); 
  
      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
  };

// module.exports = {
//   createPost,
//   getAllPosts,
// };

export default {
  createPost,
  getAllPosts,

};
