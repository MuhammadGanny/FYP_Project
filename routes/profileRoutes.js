import express from "express";
import profileController from "../controllers/profileController.js";
import authMiddleware from "../middleware/Middleware.js";
import upload from "../middleware/multerSetup.js";

const router = express.Router();

router.post("/setup-profile", upload, profileController.setupProfile);

router.get("/profile", profileController.getProfile);

router.put("/update-profile", upload, profileController.updateProfile);

router.use(authMiddleware.verifyToken);

export default router;
