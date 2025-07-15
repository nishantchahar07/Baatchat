import FriendRequest from '../models/FriendRequest.js';
import User from '../models/user.model.js';


export async  function getRecommendedUsers(req, res) {
    try {

        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
            {_id: { $ne: currentUserId }}, // Exclude the current user
            { _id: { $nin: currentUser.friends }}, // Exclude friends
            {isOnboarded: true} // Only include onboarded users 
            ]
    })
    res.status(200).json(recommendedUsers)
}
   
    catch (error) {
        console.error("Error fetching recommended users:", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
 
}


export async function getMyFriends(req, res) {
 try{
         const user= await User.findById(req.user._id)
         .select("friends")
         .populate('friends', 'fullName profilePicture nativeLanguage learningLanguage ');

         res.status(200).json(user.friends);
 }
 catch(error) {
    console.error("Error in getMyFriends controller :", error.message);
    res.status(500).json({ message: "Internal server error" });
 }

}


export async function sendFriendRequest(req, res) {
        try{
            const myId = req.user._id;
            const {id : recipientId } = req.params;

            //prevent sending friend request to self
            if (myId.toString() === recipientId) {
                return res.status(400).json({ message: "You cannot send a friend request to yourself." });

                    }
            // Check if the recipient exists
            const recipient = await User.findById(recipientId);
            if (!recipient) {   
                return res.status(404).json({ message: "Recipient not found" });        
                }
        // Check if the recipient is already a friend

        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user." });
        }

        //check if the recipient has already sent a friend request

      const existingRequest = await User.findOne({
        $or: [
            {sender : myId, recipient: recipientId},
            {sender: recipientId, recipient: myId}
            
        ]
      });

      if (existingRequest) {
            return res.status(400).json({ message: "Friend request already sent." });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });     

        res.status(200).json(friendRequest);     
    
    }

        catch(error) {
            console.error("Error in sendFriendRequestFriend controller:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }

}


export async function acceptFriendRequest(req , res) {

try{
            const { id: requestId } = req.params;
            const friendRequest = await FriendRequest.findById(requestId);
            if (!friendRequest) {
                return res.status(404).json({ message: "Friend request not found" });}

            if (friendRequest.recipient.toString() !== req.user._id.toString()) {
                    return res.status(403).json({ message: "You are not authorized to accept this friend request" });
                }

            friendRequest.status = 'accepted';
            await friendRequest.save();   
            
            // Add each other to friends list
                await User.findByIdAndUpdate(friendRequest.sender, {
                    $addToSet: { friends:  friendRequest.recipient }
                });

                await User.findByIdAndUpdate(friendRequest.recipient, {
                    $addToSet: { friends: friendRequest.sender }
                });

                res.status(200).json({ message: "Friend request accepted" });

            }


catch(error) {
    console.error("Error in acceptFriendRequest controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }

}
    

