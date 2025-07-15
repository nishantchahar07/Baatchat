import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';
const router = express.Router();

router.use(protectRoute);

router.get('/', getRecommendedUsers);
router.get('/friend', getMyFriends);
router.get('/friend-request/:id', sendFriendRequest);
router.get('/friend-request/:id/accept', acceptFriendRequest); 
// router.get('/friend-request/:id/reject', rejectFriendRequest);  TODO: have to code it later 
router.get('/friend-requests' , getFriendRequests);
router.get("/outgoing-friend-requests" , getOutgoingFriendReqs);


export default router;