// const express = require("express");

import express from "express";
import mongoose from "mongoose";
// import cors from 'cors'

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

//const db = require("./dbconnect");

//  import mongoose from "./dbconnect"
//import db from './dbconnect'
// const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes')
import userRoutes from "../FYP_Project/routes/userRoutes.js";
import postRoutes from "../FYP_Project/routes/postRoutes.js";
import companyRoutes from "../FYP_Project/routes/companyRoutes.js";
import uroutes from "../FYP_Project/routes/URoutes.js"
import profileroutes from "../FYP_Project/routes/profileRoutes.js"
// const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/company", companyRoutes);
app.use("/user",uroutes);
app.use("/profile",profileroutes)

app.get("/msg", (req, res) => res.json({ msg: "Hello world" }));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
