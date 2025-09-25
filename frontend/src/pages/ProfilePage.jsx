import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAuthUser } from "../lib/api";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MapPin, MessageCircle, VideoIcon, Calendar, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/Avatar";
import FadeIn from "../components/animations/FadeIn";
import { getLanguageFlag } from "../components/FriendCard";

const ProfilePage = () => {
  const { id } = useParams();

  // If no ID is provided, show current user's profile
  const currentUserId = id;

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["userProfile", currentUserId],
    queryFn: async () => {
      // For now, we'll just show the current authenticated user
      // In a real app, you'd have an API endpoint to get user by ID
      const authUser = await getAuthUser();
      return authUser?.user;
    },
    enabled: !!currentUserId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Profile not found</h2>
        <p className="text-base-content/70">The user profile you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Header */}
      <FadeIn>
        <Card className="overflow-hidden bg-gradient-to-br from-base-100 to-base-200/50">
          <div className="relative">
            {/* Cover gradient */}
            <div className="h-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"></div>

            <CardContent className="relative pt-0">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 -mt-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="h-32 w-32 border-4 border-base-100 shadow-xl">
                    <AvatarImage src={user.profilePic} alt={user.fullName} />
                    <AvatarFallback className="text-2xl">
                      {user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <div className="flex-1 min-w-0 pt-16 md:pt-0">
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {user.fullName}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-base-content/70 mb-4">
                    {user.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {user.bio && (
                    <p className="text-base-content/80 leading-relaxed">{user.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </FadeIn>

      {/* Language Skills */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Language Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">Native Language</h3>
                <div className="flex items-center gap-2">
                  {getLanguageFlag(user.nativeLanguage)}
                  <span className="text-lg">{user.nativeLanguage}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20">
                <h3 className="font-semibold text-secondary mb-2">Learning Language</h3>
                <div className="flex items-center gap-2">
                  {getLanguageFlag(user.learningLanguage)}
                  <span className="text-lg">{user.learningLanguage}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Action Buttons */}
      <FadeIn delay={0.4}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <a href={`/chat/${user._id}`}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </a>
              </Button>
              <Button asChild variant="success" className="flex-1">
                <a href={`/call/${user._id}`}>
                  <VideoIcon className="h-4 w-4 mr-2" />
                  Start Call
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default ProfilePage;