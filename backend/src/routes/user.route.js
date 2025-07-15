import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller';
const router = express.Router();

router.use(protectRoute)

router.get('/', getRecommendedUsers);
router.get('/friend', getMyFriends);
router.get('/friend-request/:id', sendFriendRequest);
router.get('/friend-request/:id/accept', acceptFriendRequest); 


export default router;