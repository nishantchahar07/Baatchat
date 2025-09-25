import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/Avatar";
import FadeIn from "./animations/FadeIn";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/friends", icon: UsersIcon, label: "Friends" },
    { path: "/notifications", icon: BellIcon, label: "Notifications" },
  ];
  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="w-72 bg-gradient-to-b from-base-100 to-base-200/50 border-r border-primary/10 hidden lg:flex flex-col h-screen sticky top-0 backdrop-blur-xl"
    >
      <FadeIn delay={0.2}>
        <div className="p-6 border-b border-primary/10">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20"
            >
              <Sparkles className="size-8 text-primary" />
            </motion.div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
                BaatChat
              </span>
              <p className="text-xs text-base-content/60 font-medium">Connect & Learn</p>
            </div>
          </Link>
        </div>
      </FadeIn>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <FadeIn key={item.path} delay={0.3 + index * 0.1}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${isActive 
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20 shadow-lg" 
                      : "hover:bg-primary/5 hover:text-primary text-base-content/70"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`size-5 relative z-10 ${isActive ? "text-primary" : "group-hover:text-primary"} transition-colors`} />
                  <span className={`font-medium relative z-10 ${isActive ? "text-primary" : ""}`}>{item.label}</span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-primary rounded-full relative z-10"
                    />
                  )}
                </Link>
              </motion.div>
            </FadeIn>
          );
        })}
      </nav>

      {/* USER PROFILE SECTION */}
      <FadeIn delay={0.8}>
        <div className="p-4 border-t border-primary/10 mt-auto">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={authUser?.profilePic} alt="User Avatar" />
              <AvatarFallback>
                {authUser?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-success"
                />
                <p className="text-xs text-success font-medium">Online</p>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeIn>
    </motion.aside>
  );
};
export default Sidebar;