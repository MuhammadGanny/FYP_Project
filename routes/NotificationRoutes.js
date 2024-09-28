import express from "express";
import Notification from "../controllers/NotificationController.js";

const router = express.Router();

router.get("/", Notification.getNotifications);
router.put("/markAsRead", Notification.markAsRead);

export default router;
