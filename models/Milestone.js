import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  submissionLink: { type: String },
  comments: [{ comment: String, date: Date }],
});

const Milestone = mongoose.model("Milestone", milestoneSchema);
export default Milestone;
