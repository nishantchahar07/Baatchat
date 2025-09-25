import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { theme } = useThemeStore();

  return (
    <div className="h-screen" data-theme={theme}>
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

      <Toaster />
    </div>
  );
};
export default App;