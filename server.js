import express from "express";
import mongoose from "mongoose";

import postRoutes from "../FYP_Project/routes/postRoutes.js";

import uroutes from "../FYP_Project/routes/URoutes.js";
import profileroutes from "../FYP_Project/routes/profileRoutes.js";
import milestoneRoutes from "../FYP_Project/routes/MilestoneRoutes.js";
const port = 5000;

import cors from "cors";

const app = express();

app.use(cors());

const mongoURI =
  "mongodb+srv://dbcollab:dbcollab@fyp.lswfdqq.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRoutes);

app.use("/user", uroutes);
app.use("/profile", profileroutes);
app.use("/milestone", milestoneRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
