import { useState } from "react";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import FadeIn from "../components/animations/FadeIn";
import SlideIn from "../components/animations/SlideIn";

import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-base-200/50 to-base-300/30"
      data-theme="forest"
    >
      <div className="w-full max-w-6xl mx-auto">
        <Card className="overflow-hidden border-primary/20 shadow-2xl bg-base-100/95 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row">
            
            {/* LEFT SIDE - FORM */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              <FadeIn>
                {/* LOGO */}
                <div className="mb-8 flex items-center justify-start gap-3">
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20"
                  >
                    <Sparkles className="size-8 text-primary" />
                  </motion.div>
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
                      BaatChat
                    </span>
                    <p className="text-sm text-base-content/60 font-medium">Connect & Learn</p>
                  </div>
                </div>
              </FadeIn>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error"
                >
                  <span className="text-sm font-medium">
                    {error.response?.data?.message || error.message || "An error occurred. Please try again."}
                  </span>
                </motion.div>
              )}

              <SlideIn direction="left">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Create Account
                    </h2>
                    <p className="text-base-content/70">
                      "Chit-Chat? Nah. This is BaatChat."
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-base-content/80">
                        Full Name
                      </label>
                      <Input
                      type="text"
                      placeholder="John Doe"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-base-content/80">
                        Email Address
                      </label>
                      <Input
                      type="email"
                      placeholder="john@gmail.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-base-content/80">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                      placeholder="********"
                          className="pr-12"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-base-content/60">
                        Password must be at least 6 characters long
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 text-primary bg-base-100 border-base-300 rounded focus:ring-primary focus:ring-2" 
                        required 
                      />
                      <span className="text-sm text-base-content/70 leading-relaxed">
                        I agree to the{" "}
                        <span className="text-primary hover:underline cursor-pointer">terms of service</span> and{" "}
                        <span className="text-primary hover:underline cursor-pointer">privacy policy</span>
                      </span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 text-base" disabled={isPending}>
                  {isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Create Account
                    </>
                  )}
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-base-content/70">
                    Already have an account?{" "}
                      <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                  </div>
                </form>
              </SlideIn>
            </div>

            {/* RIGHT SIDE - ILLUSTRATION */}
            <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 items-center justify-center p-12">
              <SlideIn direction="right" delay={0.3}>
                <div className="max-w-md text-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="relative aspect-square max-w-sm mx-auto mb-8"
                  >
                    <img 
                      src="/signup.png" 
                      alt="Language connection illustration" 
                      className="w-full h-full object-contain drop-shadow-2xl" 
                    />
                  </motion.div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                      Not just chatting, it's Baat that connects cultures
                    </h2>
                    <p className="text-base-content/70 leading-relaxed">
                      Practice real conversations. Make real friends. Learn together with BaatChat.
                    </p>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default SignUpPage;