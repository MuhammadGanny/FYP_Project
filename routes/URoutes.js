import express from "express";
import Controller from "../controllers/Controller.js";
import Middleware from "../middleware/Middleware.js";

const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(Middleware.verifyToken);

export default router;
