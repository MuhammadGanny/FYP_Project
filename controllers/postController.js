import Post from "../models/post.js";

const createPost = async (req, res) => {
  try {
    const { projectHeading, projectDescription, skills, author } = req.body;

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

    // Add the student to the list of applicants
    post.applicants.push(studentId);
    await post.save();

    res.status(200).json({ message: "Connected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route to get applicants for a specific project
// router.get("/posts/:postId/applicants",
const getApplicants = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("applicants");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ applicants: post.applicants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  createPost,
  getAllPosts,
  postConnect,
  getApplicants,
};
