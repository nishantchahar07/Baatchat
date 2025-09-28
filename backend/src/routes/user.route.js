import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  rejectFriendRequest,
  sendFriendRequest,
  updateProfile,
  uploadProfilePic,
  getUserById,
  upload,
} from "../controllers/user.controller.js";
const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.get("/friend-request/:id", sendFriendRequest);
router.get("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-request/:id/reject", rejectFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

router.put("/profile", updateProfile);
router.get("/:id", getUserById);
router.post("/upload-profile-pic", upload.single("profilePic"), uploadProfilePic);

export default router;
