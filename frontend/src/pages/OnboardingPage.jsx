import { useState } from "react";
import { Sparkles } from "lucide-react";

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
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Sparkles className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              BaatChat
            </span>
          </div>


          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleOnboarding}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Complete Your Profile</h2>
                  <p className="text-sm opacity-70">
                    Tell us more about yourself to get started.
                  </p>
                </div>

                <div className="space-y-3">

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      value={onboardingData.fullName}
                      onChange={(e) => setOnboardingData({ ...onboardingData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Bio</span>
                    </label>
                    <textarea
                      placeholder="Tell us about yourself..."
                      className="textarea textarea-bordered w-full"
                      value={onboardingData.bio}
                      onChange={(e) => setOnboardingData({ ...onboardingData, bio: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Native Language</span>
                    </label>
                    <input
                      type="text"
                      placeholder="English"
                      className="input input-bordered w-full"
                      value={onboardingData.nativeLanguage}
                      onChange={(e) => setOnboardingData({ ...onboardingData, nativeLanguage: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Learning Language</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Spanish"
                      className="input input-bordered w-full"
                      value={onboardingData.learningLanguage}
                      onChange={(e) => setOnboardingData({ ...onboardingData, learningLanguage: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <input
                      type="text"
                      placeholder="New York, USA"
                      className="input input-bordered w-full"
                      value={onboardingData.location}
                      onChange={(e) => setOnboardingData({ ...onboardingData, location: e.target.value })}
                      required
                    />
                  </div>

                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Complete Setup"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ONBOARDING FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/signup.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Not just chatting, it's Baat that connects cultures – BaatChat.</h2>
              <p className="opacity-70">
                Practice real conversations. Make real friends. Learn together – BaatChat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;


