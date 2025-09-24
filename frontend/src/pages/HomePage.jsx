import { useQuery } from "@tanstack/react-query";
import { getUserFriends, getRecommendedUsers } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["userFriends"],
    queryFn: getUserFriends,
  });

  const { data: recommended, isLoading: recommendedLoading } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to BaatChat</h1>
        <p className="text-base-content opacity-70">
          Connect with language partners and practice conversations together.
        </p>
      </div>

      {/* Friends Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
        {friendsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card bg-base-200 p-4 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="avatar size-12 bg-base-300 rounded-full"></div>
                  <div className="h-4 bg-base-300 rounded w-24"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-base-300 rounded w-32"></div>
                  <div className="h-3 bg-base-300 rounded w-28"></div>
                </div>
              </div>
            ))}
          </div>
        ) : friends?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        ) : (
          <NoFriendsFound />
        )}
      </div>

      {/* Recommended Users Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Find Language Partners</h2>
        {recommendedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-base-200 p-4 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="avatar size-12 bg-base-300 rounded-full"></div>
                  <div className="h-4 bg-base-300 rounded w-24"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-base-300 rounded w-32"></div>
                  <div className="h-3 bg-base-300 rounded w-28"></div>
                  <div className="h-8 bg-base-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recommended?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((user) => (
              <FriendCard key={user._id} friend={user} />
            ))}
          </div>
        ) : (
          <div className="card bg-base-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
            <p className="text-base-content opacity-70">
              Check back later for new language partners!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
