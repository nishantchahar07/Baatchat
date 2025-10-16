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
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.setQueryData(["authUser"], null);
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;