import Milestone from "../models/Milestone.js";
import Post from "../models/post.js"; // Ensure the filename and export are correct
import User from "../models/UserData.js";
import Notification from "../models/Notification.js";
import { io } from "../server.js";

const createMilestone = async (req, res) => {
  try {
    const { postId, name, description, startDate, endDate } = req.body;

    // Create and save the new milestone
    const newMilestone = new Milestone({
      postId,
      name,
      description,
      startDate,
      endDate,
    });
    await newMilestone.save();

    const post = await Post.findById(postId).populate("selectedApplicants");
    post.milestones.push(newMilestone._id);
    await post.save();

    const studentMessage = `A new milestone has been created for your project: ${post.projectHeading}`;

    for (const studentId of post.selectedApplicants) {
      const studentNotification = new Notification({
        senderId: post.author, // Company ID
        recipientIds: [studentId],
        message: studentMessage,
        type: "milestone",
        relatedId: newMilestone._id,
      });
      await studentNotification.save();

      // Emit notification to student via Socket.io
      io.to(studentId.toString()).emit("newNotification", {
        senderId: post.author,
        message: studentMessage,
        type: "milestone",
        relatedId: newMilestone._id,
        createdAt: studentNotification.createdAt,
      });
    }

    res.status(200).json({
      message: "Milestone created successfully, students notified",
      milestone: newMilestone,
    });
  } catch (error) {
    console.error("Error creating milestone and sending notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMilestones = async (req, res) => {
  try {
    const { postId } = req.params;
    const milestones = await Milestone.find({ postId });
    res.status(200).json(milestones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMilestoneStatus = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const { status } = req.body;

    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ error: "Milestone not found" });
    }
    milestone.status = status;
    await milestone.save();

    const post = await Post.findById(milestone.postId).populate(
      "selectedApplicants"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const message = `The status of the milestone "${milestone.name}" has been updated to "${status}" for your project: ${post.projectHeading}`;

    for (const studentId of post.selectedApplicants) {
      const notification = new Notification({
        senderId: post.author, // Company ID
        recipientIds: [studentId],
        message,
        type: "milestone",
        relatedId: milestone._id,
      });
      await notification.save();

      io.to(studentId.toString()).emit("newNotification", {
        senderId: post.author,
        message,
        type: "milestone",
        relatedId: milestone._id,
        createdAt: notification.createdAt,
      });
    }

    res.status(200).json({
      message: "Milestone status updated successfully, students notified",
      milestone,
    });
  } catch (error) {
    console.error("Error updating milestone status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addMilestoneComment = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const { comment } = req.body;
    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ error: "Milestone not found" });
    }
    milestone.comments.push({ comment, date: new Date() });
    await milestone.save();
    res.status(200).json({ message: "Comment added successfully", milestone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMilestone = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;
    const { milestoneId } = req.params;
    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ error: "Milestone not found" });
    }
    milestone.name = name;
    milestone.description = description;
    milestone.startDate = startDate;
    milestone.endDate = endDate;
    milestone.status = status;
    await milestone.save();
    res
      .status(200)
      .json({ message: "Milestone updated successfully", milestone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudentMilestones = async (req, res) => {
  try {
    const { userId } = req.userData;
    const user = await User.findById(userId).populate("Sprofile").exec();
    const post = await Post.findOne({ selectedApplicants: user.Sprofile._id });
    if (!post) {
      return res
        .status(403)
        .json({ error: "Not authorized to view milestones" });
    }
    const milestones = await Milestone.find({ projectId: post._id });
    res.status(200).json(milestones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addSubmissionLink = async (req, res) => {
  const { milestoneId } = req.params;
  const { submissionLink } = req.body;

  try {
    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ error: "Milestone not found" });
    }

    milestone.submissionLinks.push(submissionLink);
    await milestone.save();

    res.status(200).json(milestone);
  } catch (error) {
    console.error("Error adding submission link:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  createMilestone,
  updateMilestoneStatus,
  addMilestoneComment,
  getMilestones,
  updateMilestone,
  getStudentMilestones,
  updateMilestoneStatus,
  addMilestoneComment,
  addSubmissionLink,
};
