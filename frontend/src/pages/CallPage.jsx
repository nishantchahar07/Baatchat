import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StreamCall, StreamVideo, StreamVideoClient, CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken, createVideoCall, getVideoToken } from "../lib/api";

const CallPage = () => {
   const { id: callId } = useParams();
   const { authUser } = useAuthUser();
   const [client, setClient] = useState(null);
   const [call, setCall] = useState(null);
   const queryClient = useQueryClient();

   const { data: chatToken } = useQuery({
     queryKey: ["streamToken"],
     queryFn: getStreamToken,
     enabled: !!authUser,
   });

   // Create call first
   const { mutateAsync: createCall, isLoading: isCreatingCall } = useMutation({
     mutationFn: createVideoCall,
   });

   // Get video token after call is created
   const { data: videoToken, isLoading: isLoadingVideoToken } = useQuery({
     queryKey: ["videoToken", callId],
     queryFn: () => getVideoToken(callId),
     enabled: !!callId && !isCreatingCall,
   });

  useEffect(() => {
    if (videoToken && authUser && !client) {
      const videoClient = new StreamVideoClient({
        apiKey: import.meta.env.VITE_STREAM_API_KEY,
        token: videoToken.token,
        user: {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        },
      });

      setClient(videoClient);
    }
  }, [videoToken, authUser, client]);

  useEffect(() => {
    if (callId && !isCreatingCall && authUser) {
      createCall(callId);
    }
  }, [callId, isCreatingCall, createCall, authUser]);

  useEffect(() => {
    if (client && callId) {
      const videoCall = client.call("default", callId);
      videoCall.join();
      setCall(videoCall);

      return () => {
        videoCall.leave();
      };
    }
  }, [client, callId]);

  if (!client || !call || isCreatingCall || isLoadingVideoToken) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4">
            {isCreatingCall ? "Creating call..." : "Connecting to call..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div className="h-screen bg-black">
          <SpeakerLayout />
          <CallControls />
        </div>
      </StreamCall>
    </StreamVideo>
  );
};

export default CallPage;
