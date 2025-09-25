import { useQuery } from "@tanstack/react-query";
import { getUserFriends, getRecommendedUsers } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../components/animations/StaggerContainer";
import FadeIn from "../components/animations/FadeIn";
import { Users, Sparkles, Globe } from "lucide-react";

const HomePage = () => {
  const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["userFriends"],
    queryFn: getUserFriends,
  });

  const { data: recommended, isLoading: recommendedLoading } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const SkeletonCard = () => (
    <div className="rounded-2xl border border-base-300/50 bg-base-100/80 p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-14 w-14 bg-base-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-base-300 rounded w-32 mb-2"></div>
          <div className="h-3 bg-base-300 rounded w-24"></div>
        </div>
      </div>
      <div className="flex gap-2 mb-6">
        <div className="h-6 bg-base-300 rounded-full w-24"></div>
        <div className="h-6 bg-base-300 rounded-full w-28"></div>
      </div>
      <div className="flex gap-3">
        <div className="h-11 bg-base-300 rounded-xl flex-1"></div>
        <div className="h-11 w-11 bg-base-300 rounded-xl"></div>
      </div>
    </div>
  );
  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <FadeIn>
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome to BaatChat</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Connect & Learn Together
          </h1>
          
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Practice real conversations with native speakers, make meaningful connections, and accelerate your language learning journey.
          </p>
        </div>
      </FadeIn>

      {/* Friends Section */}
      <FadeIn delay={0.3}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Your Language Partners</h2>
              <p className="text-sm text-base-content/60">Continue conversations with your friends</p>
            </div>
          </div>
          
        {friendsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
          </div>
        ) : friends?.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friends.map((friend) => (
                <StaggerItem key={friend._id}>
                  <FriendCard friend={friend} />
                </StaggerItem>
              ))}
            </StaggerContainer>
        ) : (
          <NoFriendsFound />
        )}
        </div>
      </FadeIn>

      {/* Recommended Users Section */}
      <FadeIn delay={0.5}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20">
              <Globe className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary">Discover New Partners</h2>
              <p className="text-sm text-base-content/60">Connect with language learners worldwide</p>
            </div>
          </div>
          
        {recommendedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
          </div>
        ) : recommended?.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
              {recommended.map((user) => (
                <StaggerItem key={user._id}>
                  <FriendCard friend={user} />
                </StaggerItem>
              ))}
            </StaggerContainer>
        ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-6 rounded-2xl bg-gradient-to-br from-base-100 to-base-200/50 border border-primary/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No recommendations available</h3>
              <p className="text-base-content/70 max-w-md mx-auto">
                Check back later for new language partners to connect with!
              </p>
            </motion.div>
        )}
          </div>
      </FadeIn>
    </div>
  );
};

export default HomePage;
