import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StreamCall, StreamVideo, StreamVideoClient, CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import { useQuery } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";

const CallPage = () => {
  const { id: callId } = useParams();
  const { authUser } = useAuthUser();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  const { data: token } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (token && authUser && !client) {
      const videoClient = new StreamVideoClient({
        apiKey: process.env.REACT_APP_STREAM_API_KEY || "3whrp8a4msd6",
        token: token.token,
        user: {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        },
      });

      setClient(videoClient);
    }
  }, [token, authUser, client]);

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

  if (!client || !call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4">Connecting to call...</p>
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
