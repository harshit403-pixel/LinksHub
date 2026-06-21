import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateProfile } from "./auth.api";

export const useUpdateProfile = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });

      toast.success(
        "Profile updated"
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to update profile"
      );
    },
  });
};