import { useState } from "react";
import { Sparkles, User, Globe, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Card, CardContent } from "../components/ui/Card";
import FadeIn from "../components/animations/FadeIn";
import SlideIn from "../components/animations/SlideIn";
import { LANGUAGES } from "../constants";

import useOnboarding from "../hooks/useOnboarding";

const OnboardingPage = () => {
  const [onboardingData, setOnboardingData] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
  });

  const { isPending, error, onboardingMutation } = useOnboarding();

  const handleOnboarding = (e) => {
    e.preventDefault();
    onboardingMutation(onboardingData);
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
                  <span className="text-sm font-medium">{error.response.data.message}</span>
                </motion.div>
              )}

              <SlideIn direction="left">
                <form onSubmit={handleOnboarding} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Complete Your Profile
                    </h2>
                    <p className="text-base-content/70">
                      Tell us more about yourself to get started on your language journey.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={onboardingData.fullName}
                        onChange={(e) => setOnboardingData({ ...onboardingData, fullName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Bio
                      </label>
                      <Textarea
                        placeholder="Tell us about yourself, your interests, and what you'd like to achieve..."
                        value={onboardingData.bio}
                        onChange={(e) => setOnboardingData({ ...onboardingData, bio: e.target.value })}
                        required
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Native Language
                        </label>
                        <select
                          className="w-full h-12 px-4 rounded-xl border-2 border-base-300/50 bg-base-100/50 backdrop-blur-sm text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary/50 hover:border-base-300 hover:bg-base-100/80"
                          value={onboardingData.nativeLanguage}
                          onChange={(e) => setOnboardingData({ ...onboardingData, nativeLanguage: e.target.value })}
                          required
                        >
                          <option value="">Select your native language</option>
                          {LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Learning Language
                        </label>
                        <select
                          className="w-full h-12 px-4 rounded-xl border-2 border-base-300/50 bg-base-100/50 backdrop-blur-sm text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary/50 hover:border-base-300 hover:bg-base-100/80"
                          value={onboardingData.learningLanguage}
                          onChange={(e) => setOnboardingData({ ...onboardingData, learningLanguage: e.target.value })}
                          required
                        >
                          <option value="">Select language you're learning</option>
                          {LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </label>
                      <Input
                        type="text"
                        placeholder="New York, USA"
                        value={onboardingData.location}
                        onChange={(e) => setOnboardingData({ ...onboardingData, location: e.target.value })}
                        required
                      />
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
                        Setting up your profile...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Complete Setup
                      </>
                    )}
                  </Button>
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

export default OnboardingPage;


