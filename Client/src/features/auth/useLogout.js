import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { logout } from "./auth.api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.clear();

      toast.success("Logged out");

      navigate("/login");
    },

    onError: () => {
      toast.error("Failed to logout");
    },
  });
};