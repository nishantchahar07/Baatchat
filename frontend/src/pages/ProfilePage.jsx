import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAuthUser } from "../lib/api";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MapPin, MessageCircle, VideoIcon, Calendar, Globe, Edit, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/Avatar";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import FadeIn from "../components/animations/FadeIn";
import { getLanguageFlag } from "../components/FriendCard";
import useAuthUser from "../hooks/useAuthUser";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import { axiosInstance } from "../lib/axios";

const generateAvatarSVG = (initials) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="64" fill="#14b8a6"/>
      <text x="64" y="80" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
    </svg>
  `)}`;
};

const ProfilePage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["userProfile", id || (authUser?._id) || "current"],
    queryFn: async () => {
      if (id) {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
      } else {
        const authUser = await getAuthUser();
        return authUser?.user;
      }
    },
    enabled: true,
  });

  console.log("ProfilePage - user after query:", user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: "",
  });
  const [updating, setUpdating] = useState(false);

  const currentUserId = user?._id;
  const isOwnProfile = user?._id === authUser?._id;
  console.log("ProfilePage - user:", user, "authUser:", authUser, "isOwnProfile:", isOwnProfile);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        bio: user.bio || "",
        nativeLanguage: user.nativeLanguage || "",
        learningLanguage: user.learningLanguage || "",
        location: user.location || "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original data
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        bio: user.bio || "",
        nativeLanguage: user.nativeLanguage || "",
        learningLanguage: user.learningLanguage || "",
        location: user.location || "",
        profilePic: user.profilePic || "",
      });
    }
  };

  const handleSave = async () => {
    setUpdating(true);
    try {
      await axiosInstance.put("/users/profile", {
        fullName: formData.fullName,
        bio: formData.bio,
        nativeLanguage: formData.nativeLanguage,
        learningLanguage: formData.learningLanguage,
        location: formData.location,
      });
      // Invalidate and refetch user data
      queryClient.invalidateQueries(["userProfile", currentUserId]);
      queryClient.invalidateQueries(["authUser"]);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleProfilePicUpdate = (newUrl) => {
    setFormData(prev => ({ ...prev, profilePic: newUrl }));
    // Update the query cache
    queryClient.invalidateQueries(["userProfile", currentUserId]);
    queryClient.invalidateQueries(["authUser"]);
  };

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
                  {isOwnProfile ? (
                     <ProfilePictureUpload
                       currentPic={user.profilePic}
                       onUpdate={handleProfilePicUpdate}
                       initials={user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || "JD"}
                       user={user}
                       currentUserId={currentUserId}
                     />
                  ) : (
                    <Avatar className="h-32 w-32 border-4 border-base-100 shadow-xl">
                      <AvatarImage src={user.profilePic || generateAvatarSVG(user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || "JD")} alt={user.fullName} />
                      <AvatarFallback className="text-2xl">
                        {user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>

                <div className="flex-1 min-w-0 pt-16 md:pt-0">
                  {isEditing && isOwnProfile ? (
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-none p-0 h-auto"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {user.fullName}
                    </h1>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-base-content/70 mb-4">
                    {isEditing && isOwnProfile ? (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <Input
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Enter location"
                          className="h-6 p-1 text-sm"
                        />
                      </div>
                    ) : (
                      user.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
                        </div>
                      )
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {isEditing && isOwnProfile ? (
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      className="text-base-content/80 leading-relaxed resize-none"
                      rows={3}
                    />
                  ) : (
                    user.bio && (
                      <p className="text-base-content/80 leading-relaxed">{user.bio}</p>
                    )
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
                {isEditing && isOwnProfile ? (
                  <Input
                    value={formData.nativeLanguage}
                    onChange={(e) => setFormData(prev => ({ ...prev, nativeLanguage: e.target.value }))}
                    placeholder="e.g., English"
                    className="text-lg"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    {getLanguageFlag(user.nativeLanguage)}
                    <span className="text-lg">{user.nativeLanguage}</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20">
                <h3 className="font-semibold text-secondary mb-2">Learning Language</h3>
                {isEditing && isOwnProfile ? (
                  <Input
                    value={formData.learningLanguage}
                    onChange={(e) => setFormData(prev => ({ ...prev, learningLanguage: e.target.value }))}
                    placeholder="e.g., Spanish"
                    className="text-lg"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    {getLanguageFlag(user.learningLanguage)}
                    <span className="text-lg">{user.learningLanguage}</span>
                  </div>
                )}
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
              {isOwnProfile ? (
                isEditing ? (
                  <>
                    <Button onClick={handleSave} disabled={updating} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {updating ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex-1">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEdit} className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )
              ) : (
                <>
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
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default ProfilePage;