import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

import PageLoader from "./components/PageLoader.jsx";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage.jsx"));
const CallPage = lazy(() => import("./pages/CallPage.jsx"));
const ChatPage = lazy(() => import("./pages/ChatPage.jsx"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));

import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { theme } = useThemeStore();

  return (
    <div className="h-screen" data-theme={theme}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route
            path="/signup"
            element={
              <ProtectedRoute requireAuth={false}>
                <SignUpPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />

          {/* Protected routes requiring auth and onboarding */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Layout showSidebar={true}>
                  <NotificationsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/call/:id"
            element={
              <ProtectedRoute>
                <CallPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <Layout showSidebar={false}>
                  <ChatPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Profile route */}
          <Route
            path="/profile/:id?"
            element={
              <ProtectedRoute>
                <Layout showSidebar={true}>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
  
          {/* Onboarding route - requires auth but not onboarding */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute requireOnboarding={false}>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      <Toaster />
    </div>
  );
};
export default App;