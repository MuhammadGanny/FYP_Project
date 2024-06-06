import express from "express";
import MilestoneController from "../controllers/MilestoneController.js";
//import authMiddleware from "../middleware/Middleware.js";

const router = express.Router();

//router.use(authMiddleware.verifyToken);

//router.post("/create", projectController.createProject);
//router.post("/select-applicants", projectController.selectApplicants);
//router.post("/create-milestone", MilestoneController.createMilestone);

router.post("/", MilestoneController.createMilestone);
router.get("/:postId", MilestoneController.getMilestones);
router.put("/update-milestone", MilestoneController.updateMilestoneStatus);
router.post("/add-comment", MilestoneController.addMilestoneComment);

router.put("/:milestoneId", MilestoneController.updateMilestone);
export default router;
