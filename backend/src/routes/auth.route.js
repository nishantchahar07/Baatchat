import express from "express";
import {
  login,
  logout,
  onboard,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/onboarding", protectRoute, onboard);

// forget-password
//send reset-password email
//reset-password

TODO: router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ message: "User authenticated", user: req.user });
});

export default router;
