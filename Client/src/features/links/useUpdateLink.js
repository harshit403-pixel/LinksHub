import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { updateLink } from "./link.api";

export const useUpdateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      updateLink(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });

      toast.success("Link updated");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update link"
      );
    },
  });
};