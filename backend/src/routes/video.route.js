import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCall, getVideoToken } from "../controllers/video.controller.js";

const router = express.Router();

// Create a new video call
router.post("/create", protectRoute, createCall);

// Get video token for joining a call
router.get("/token/:callId", protectRoute, getVideoToken);

export default router;