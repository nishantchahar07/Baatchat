import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout as logoutApi } from "../lib/api";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear all cached data to ensure clean logout
      queryClient.clear();

      // Show success message
      toast.success("Logged out successfully");

      // Navigate to login page
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    },
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;