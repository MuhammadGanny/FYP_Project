import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import postController from "../controllers/postController.js";

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.post("/connect", postController.postConnect);
router.get("/completed-projects", postController.getCompletedProjects);
router.get("/:postId/applicants", postController.getApplicants);
router.get("/author/:authorId", postController.getPostsByAuthor);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);
router.get("/:postId", postController.getPostById);
router.post("/select-applicants", postController.selectApplicants);
// router.post(
//   "/select-applicants",
//   authMiddleware,
//   postController.selectApplicants
// );
router.get(
  "/projects-for-student/:userId",
  postController.getProjectsForStudent
);
router.put("/:postId/complete", postController.completeProject);

export default router;
