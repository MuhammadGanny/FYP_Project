import Post from "../models/post.js";
import User from "../models/UserData.js";
import StudentProfile from "../models/StudentProfile.js";
import { io } from "../server.js";
import Notification from "../models/Notification.js";

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

//   const { postId, studentId } = req.body;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     if (!post.applicants.includes(studentId)) {
//       post.applicants.push(studentId);
//       await post.save();

//       const companyId = post.author;

//       // Emit the notification
//       io.to(companyId).emit("notification", {
//         message: "A student has connected to your post!",
//         postId,
//         studentId,
//       });

//       console.log(`Notification sent to company with ID ${companyId}`);

//       res.status(200).json({ message: "Connected successfully" });
//     } else {
//       res.status(400).json({ error: "Student already applied" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
//ye newgpt ne diya hai
const postConnect = async (req, res) => {
  const { postId, studentId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!post.applicants.includes(studentId)) {
      post.applicants.push(studentId);
      await post.save();

      const companyId = post.author;
      const message = `A student has connected to your project: ${post.projectHeading}`;

      const notification = new Notification({
        senderId: studentId,
        recipientIds: [companyId],
        message,
        type: "project",
        relatedId: postId,
      });
      await notification.save();

      io.to(companyId.toString()).emit("newNotification", {
        senderId: studentId,
        message,
        type: "project",
        relatedId: postId,
        createdAt: notification.createdAt,
      });

      res.status(200).json({ message: "Connected successfully" });
    } else {
      res.status(400).json({ error: "Student already applied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//   const { postId, studentId } = req.body;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     // Ensure uniqueness of studentId in applicants array
//     if (!post.applicants.includes(studentId)) {
//       post.applicants.push(studentId);
//       await post.save();

//       // Fetch the company's user ID
//       const companyId = post.author;

//       // Emit a notification to the company
//       io.to(companyId).emit("notification", {
//         message: "A student has connected to your post!",
//         postId,
//         studentId,
//       });

//       res.status(200).json({ message: "Connected successfully" });
//     } else {
//       res.status(400).json({ error: "Student already applied" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

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

const selectApplicants = async (req, res) => {
  try {
    const { postId, applicantIds, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Ensure exactly 2 applicants are selected
    if (applicantIds.length !== 2) {
      return res
        .status(400)
        .json({ error: "Exactly 2 applicants must be selected" });
    }

    post.selectedApplicants = applicantIds;
    post.status = "in progress";
    await post.save();

    const message = `You have been selected for the project: ${post.projectHeading}`;

    for (const applicantId of applicantIds) {
      const notification = new Notification({
        senderId: userId,
        recipientIds: [applicantId],
        message,
        type: "project",
        relatedId: postId,
      });
      await notification.save();

      io.to(applicantId.toString()).emit("newNotification", {
        senderId: userId,
        message,
        type: "project",
        relatedId: postId,
        createdAt: notification.createdAt,
      });
    }

    res
      .status(200)
      .json({ message: "Applicants selected and notified successfully", post });
  } catch (error) {
    console.error("Error selecting applicants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProjectsForStudent = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const posts = await Post.find({ selectedApplicants: userId });
    res.status(200).json({ posts });
    console.log(`Posts found for userId ${userId}:`, posts);
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching posts by author" });
  }
};

const completeProject = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("selectedApplicants");
    if (!post) {
      return res.status(404).json({ error: "Project not found" });
    }

    post.status = "completed";
    await post.save();

    const studentMessage = `The project "${post.projectHeading}" has been completed.`;

    for (const studentId of post.selectedApplicants) {
      const studentNotification = new Notification({
        senderId: post.author,
        recipientIds: [studentId],
        message: studentMessage,
        type: "project",
        relatedId: post._id,
      });
      await studentNotification.save();

      io.to(studentId.toString()).emit("newNotification", {
        senderId: post.author,
        message: studentMessage,
        type: "project",
        relatedId: post._id,
        createdAt: studentNotification.createdAt,
      });
    }

    res.status(200).json({ message: "Project completed successfully", post });
  } catch (error) {
    console.error("Error completing the project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getCompletedProjects = async (req, res) => {
  try {
    const { userId, userType } = req.query;

    let completedProjects = [];

    if (userType === "student") {
      const user = await User.findById(userId).populate("Sprofile").exec();
      if (!user || !user.Sprofile) {
        return res.status(404).json({ error: "Student profile not found" });
      }

      completedProjects = await Post.find({
        selectedApplicants: user._id,
        status: "completed",
      }).populate({
        path: "author",
        populate: { path: "Cprofile", select: "companyName" },
      });

      console.log("Completed Projects for Student:", completedProjects);
    } else if (userType === "company") {
      completedProjects = await Post.find({
        author: userId,
        status: "completed",
      }).populate({
        path: "selectedApplicants",
        populate: { path: "Sprofile", select: "name" },
      });

      console.log("Completed Projects for Company:", completedProjects);
    }

    res.status(200).json({
      completedProjects: completedProjects.map((project) => ({
        projectHeading: project.projectHeading,
        ...(userType === "student"
          ? { companyName: project.author.Cprofile?.companyName }
          : {
              students: project.selectedApplicants.map((student) => {
                const studentProfile = student.Sprofile;
                return studentProfile
                  ? studentProfile.name
                  : student._id.toString();
              }),
            }),
      })),
    });
  } catch (error) {
    console.error("Error fetching completed projects:", error);
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
  deletePost,
  getPostById,
  selectApplicants,
  getProjectsForStudent,
  completeProject,
  getCompletedProjects,
};
