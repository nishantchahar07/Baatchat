import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getMyFriends, getRecommendedUsers } from '../controllers/user.controller';
const router = express.Router();

router.use(protectRoute)

router.get('/', getRecommendedUsers);
router.get('/friend', getMyFriends);





export default router;