import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Sparkles } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/Avatar";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="bg-base-100/80 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-30 h-16 flex items-center shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          
          {isChatPage && (
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="pl-5"
            >
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20"
                >
                  <Sparkles className="size-6 text-primary" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
                  BaatChat
                </span>
              </Link>
            </motion.div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link to="/notifications">
                  <BellIcon className="h-5 w-5" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"
                  />
                </Link>
              </Button>
            </motion.div>
            <ThemeSelector />

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mx-2"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={authUser?.profilePic} alt="User Avatar" />
                <AvatarFallback>
                  {authUser?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logoutMutation}
                className="text-error hover:text-error hover:bg-error/10"
              >
                <LogOutIcon className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
      </div>
    </nav>
  );
};
export default Navbar;