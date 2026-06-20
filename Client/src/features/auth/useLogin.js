import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login, getMe } from "./auth.api";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: async () => {
      const authData = await getMe();

      queryClient.setQueryData(
        ["auth"],
        authData
      );

      toast.success("Welcome back!");

      navigate("/dashboard");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to login"
      );
    },
  });
};