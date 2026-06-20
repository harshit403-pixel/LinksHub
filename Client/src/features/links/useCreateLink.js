import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createLink } from "./link.api";

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLink,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });

      toast.success("Link created successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create link"
      );
    },
  });
};