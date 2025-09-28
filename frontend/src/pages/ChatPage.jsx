import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from "stream-chat-react";
import { useQuery } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";
import ChatLoader from "../components/ChatLoader";

const ChatPage = () => {
  const { id: receiverId } = useParams();
  const { authUser } = useAuthUser();
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const { data: token, isLoading: tokenLoading } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (token && authUser && !client) {
      const chatClient = StreamChat.getInstance(import.meta.env.VITE_STREAM_API_KEY);

      chatClient.connectUser(
        {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        },
        token.token
      );

      setClient(chatClient);
    }
  }, [token, authUser, client]);

  useEffect(() => {
    if (client && authUser && receiverId) {
      const channelId = [authUser._id, receiverId].sort().join("-");

      const chatChannel = client.channel("messaging", channelId, {
        members: [authUser._id, receiverId],
      });

      chatChannel.watch();
      setChannel(chatChannel);
    }

    return () => {
      if (channel) {
        channel.stopWatching();
      }
    };
  }, [client, authUser, receiverId, channel]);

  useEffect(() => {
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [client]);

  if (tokenLoading || !client || !channel) {
    return <ChatLoader />;
  }

  return (
    <div className="h-screen">
      <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
