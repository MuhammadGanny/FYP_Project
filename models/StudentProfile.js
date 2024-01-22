import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
  name: String,
  university: String,
  bio: String,
  projects: [String],
  skills: [String],
  experiences: [String],
  education: [String],
  profilePicture: String,
});

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

export default StudentProfile;
