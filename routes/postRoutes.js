import express from "express";
const router = express.Router();

import postController from "../controllers/postController.js";

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.post("/connect", postController.postConnect);
router.get("/:postId/applicants", postController.getApplicants);
router.get("/author/:authorId", postController.getPostsByAuthor);
export default router;
