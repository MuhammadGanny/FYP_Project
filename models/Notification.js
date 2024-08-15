import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipientIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["project", "milestone", "general"],
    required: true,
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    refPath: "type",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;

// const mongoose = require("mongoose");

// const notificationSchema = new mongoose.Schema();
// // {
// //   sender: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "UserData", // Reference to the sender (student)
// //   },
// //   receiver: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "UserData", // Reference to the receiver (company)
// //   },
// //   message: String,
// //   projectId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Post", // Reference to the project
// //   },
// //   read: {
// //     type: Boolean,
// //     default: false,
// //   },
// // },
// // { timestamps: true }

// const Notification = mongoose.model("Notification", notificationSchema);

// module.exports = Notification;

// models/Notification.js

// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
//   {
//     recipient: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "UserData",
//       required: true,
//     },
//     message: { type: String, required: true },
//     type: { type: String, required: true },
//     isRead: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// const Notification = mongoose.model("Notification", notificationSchema);

// export default Notification;
