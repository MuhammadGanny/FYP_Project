import Notification from "../models/Notification.js";
import { io } from "../server.js"; // Ensure your server exports io
import UserData from "../models/UserData.js";
import StudentProfile from "../models/StudentProfile.js";
import CompanyProfileData from "../models/CompanyProfile.js";

// export async function sendNotification(
//   senderId,
//   recipientIds,
//   message,
//   type,
//   relatedId = null
// ) {
//   try {
//     const notification = new Notification({
//       senderId,
//       recipientIds,
//       message,
//       type,
//       relatedId,
//     });
//     await notification.save();

//     recipientIds.forEach((recipientId) => {
//       io.to(recipientId.toString()).emit("newNotification", {
//         senderId,
//         message,
//         type,
//         relatedId,
//         createdAt: notification.createdAt,
//       });
//     });
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// }
// const sendNotification = async (
//   senderId,
//   recipientIds,
//   message,
//   type,
//   relatedId = null
// ) => {
//   try {
//     const notification = new Notification({
//       senderId,
//       recipientIds: [recipientId],
//       message,
//       type,
//       relatedId,
//     });
//     await notification.save();

//     recipientIds.forEach((recipientId) => {
//       // Emit the notification to the recipient via their socket ID
//       io.to(recipientId.toString()).emit("newNotification", {
//         senderId,
//         message,
//         type,
//         relatedId,
//         createdAt: notification.createdAt,
//       });
//     });
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// };
const sendNotification = async (
  senderId,
  recipientIds,
  message,
  type,
  relatedId = null
) => {
  try {
    // Create notifications for each recipient
    for (const recipientId of recipientIds) {
      const notification = new Notification({
        senderId,
        recipientIds: [recipientId],
        message,
        type,
        relatedId,
      });
      await notification.save();

      // Emit the notification to the recipient via their socket ID
      io.to(recipientId.toString()).emit("newNotification", {
        senderId,
        message,
        type,
        relatedId,
        createdAt: notification.createdAt,
      });
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

const getNotifications = async (req, res) => {
  const { userId } = req.query;

  try {
    // Find notifications where the user is a recipient
    const notifications = await Notification.find({ recipientIds: userId })
      .populate({
        path: "senderId",
        model: UserData,
        select: "userType Sprofile Cprofile",
        populate: [
          {
            path: "Sprofile",
            model: StudentProfile,
            select: "name profilePicture",
          },
          {
            path: "Cprofile",
            model: CompanyProfileData,
            select: "companyName profilePicture",
          },
        ],
      })
      .exec();

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
const markAsRead = async (req, res) => {
  const { userId } = req.body;

  try {
    await Notification.updateMany(
      { recipientIds: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
};

// import Notification from "../models/Notification.js";

// // After adding the notification schema, you can create a new notification when a student connects with a project

// // router.post('/posts/connect',
// const connectNotification = async (req, res) => {
//   const { postId, studentId } = req.body;

//   try {
//     // Logic to connect the student with the project...

//     // Create a notification for the company
//     const newNotification = new Notification({
//       sender: studentId,
//       receiver: companyId, // Assuming you have companyId available
//       message: "New applicant connected with your project",
//       projectId: postId,
//     });
//     await newNotification.save();

//     res.status(200).json({ message: "Connected successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export default {
  getNotifications,
  sendNotification,
  markAsRead,
};
