import { Navigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";

const ProtectedRoute = ({ children, requireAuth = true, requireOnboarding = true }) => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAuth && isAuthenticated && requireOnboarding && !isOnboarded) {
    return <Navigate to="/onboarding" />;
  }

  if (isAuthenticated && requireOnboarding && !isOnboarded && window.location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  if (!requireAuth && isAuthenticated && isOnboarded) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;