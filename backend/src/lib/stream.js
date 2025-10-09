import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// For now, we'll use the REST API approach for video calls
// until we can identify the correct SDK

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
   try {
     // ensure userId is a string
     const userIdStr = userId.toString();
     return streamClient.createToken(userIdStr);
   } catch (error) {
     console.error("Error generating Stream token:", error);
   }
 };

export const createVideoCall = async (callId, callType = "default") => {
   try {
     const call = streamVideoClient.call(callType, callId);
     await call.create({
       data: {
         created_by_id: callId,
         members: [],
       },
     });
     return call;
   } catch (error) {
     console.error("Error creating video call:", error);
     throw error;
   }
 };

export const generateVideoToken = (userId, callId) => {
   try {
     const userIdStr = userId.toString();
     return streamVideoClient.createCallToken(userIdStr, callId);
   } catch (error) {
     console.error("Error generating video token:", error);
     throw error;
   }
 };