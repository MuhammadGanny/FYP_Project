import Post from "../models/post.js";

const createPost = async (req, res) => {
  try {
    const { projectHeading, projectDescription, skills, author } = req.body;
    //const author = req.userId; // Assuming you have middleware to extract user ID from the request
    //const author = req.cookies.userId;

    const newPost = new Post({
      projectHeading,
      projectDescription,
      skills,
      author,
    });

    const savedPost = await newPost.save();

    if (savedPost) {
      res
        .status(201)
        .json({ message: "Post created successfully", post: savedPost });
    } else {
      res.status(500).json({ error: "Failed to save the post" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post" });
  }
};

const getPostsByAuthor = async (req, res) => {
  const authorId = req.params.authorId;

  try {
    const posts = await Post.find({ author: authorId });
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching posts by author" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
};

// router.post("/posts/connect",
const postConnect = async (req, res) => {
  const { postId, studentId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Ensure uniqueness of studentId in applicants array
    if (!post.applicants.includes(studentId)) {
      // Add the student to the list of applicants
      post.applicants.push(studentId);
      await post.save();
      res.status(200).json({ message: "Connected successfully" });
    } else {
      res.status(400).json({ error: "Student already applied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getApplicants = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ applicants: post.applicants });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
};
const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { projectHeading, projectDescription, skills } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { projectHeading, projectDescription, skills },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
};
const getPostById = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  createPost,
  getAllPosts,
  postConnect,
  getApplicants,
  getPostsByAuthor,
  updatePost,
  deletePost, // Add deletePost function to exports
  getPostById,
};
