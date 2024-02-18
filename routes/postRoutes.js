import express from "express";
const router = express.Router();

import postController from "../controllers/postController.js";

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);

export default router;
