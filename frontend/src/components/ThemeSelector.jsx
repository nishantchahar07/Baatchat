import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/Button";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <PaletteIcon className="size-5" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 p-2 shadow-2xl bg-base-100/95 backdrop-blur-xl rounded-2xl w-72 border border-primary/20 max-h-80 overflow-y-auto z-50"
            >
              <div className="space-y-1">
                {THEMES.map((themeOption, index) => (
                  <motion.button
                    key={themeOption.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`
                      w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 group
                      ${
                        theme === themeOption.name
                          ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30"
                          : "hover:bg-primary/5 hover:border-primary/20 border border-transparent"
                      }
                    `}
                    onClick={() => {
                      setTheme(themeOption.name);
                      setIsOpen(false);
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PaletteIcon className="size-4" />
                    </motion.div>
                    <span className="text-sm font-medium flex-1 text-left">{themeOption.label}</span>
                    
                    <div className="flex gap-1">
                      {themeOption.colors.map((color, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.2 }}
                          className="size-3 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    
                    {theme === themeOption.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;