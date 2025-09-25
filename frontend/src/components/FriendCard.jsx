import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { VideoIcon, MessageCircle, Globe, User } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/Avatar";

const FriendCard = ({ friend }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group overflow-hidden bg-gradient-to-br from-base-100 to-base-200/50 border-primary/10 hover:border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Avatar className="h-14 w-14 ring-primary/30 group-hover:ring-primary/60">
                <AvatarImage src={friend.profilePic} alt={friend.fullName} />
                <AvatarFallback>
                  {friend.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {friend.fullName}
              </h3>
              <p className="text-sm text-base-content/60 flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {friend.location || "Location not set"}
              </p>
            </div>
        </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="default" className="flex items-center gap-1.5 px-3 py-1">
              {getLanguageFlag(friend.nativeLanguage)}
              <span className="font-medium">Native: {friend.nativeLanguage}</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
              {getLanguageFlag(friend.learningLanguage)}
              <span className="font-medium">Learning: {friend.learningLanguage}</span>
            </Badge>
          </div>

          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1 group/btn">
              <Link to={`/chat/${friend._id}`}>
                <MessageCircle className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                Message
              </Link>
            </Button>
            <Button asChild variant="secondary" size="icon" className="group/btn">
              <Link to={`/profile/${friend._id}`}>
                <User className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="success" size="icon" className="group/btn">
              <Link to={`/call/${friend._id}`}>
                <VideoIcon className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/20x15/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 w-4 object-cover rounded-sm"
      />
    );
  }
  return null;
}