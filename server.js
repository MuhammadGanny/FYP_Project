import express from "express";
import http from "http"; // New: Import http module
// import { Server } from "socket.io"; // New: Import Server from socket.io
import { Server as SocketIoServer } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
// import cookieParser from "cookie-parser";
import postRoutes from "./routes/postRoutes.js";
import uroutes from "./routes/URoutes.js";
import profileroutes from "./routes/profileRoutes.js";
import milestoneRoutes from "./routes/MilestoneRoutes.js";
import notificationsRoutes from "./routes/NotificationRoutes.js";
// import app from './src/App.jsx'
const app = express();
const server = http.createServer(app); // New: Create an HTTP server
// export const io = new SocketIoServer(server);
// app.use(cookieParser());

// const io = new SocketIoServer(server, {
//   cors: {
//     origin: "*", // Allow all origins, configure as per your need
//     methods: ["GET", "POST"],
//   },
// });
const io = new SocketIoServer(server, {
  cors: {
    origin: "https://fyp-project-eight.vercel.app", // Replace with your actual frontend URL
    methods: ["GET", "POST"],
  },
});

// const port = 5000;
const port = process.env.PORT || 5000;

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRoutes);
app.use("/user", uroutes);
app.use("/profile", profileroutes);
app.use("/milestone", milestoneRoutes);
app.use("/notifications", notificationsRoutes);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", ({ userId }) => {
    socket.join(userId.toString());
    console.log(`User ${userId} joined their room`, socket.rooms);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

export { io }; // New: Export io for use in other modules
