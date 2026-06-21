import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { reorderLinks } from "./link.api";

export const useReorderLinks =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: reorderLinks,

      onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["links"],
  });
},

      onError: (error) => {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to reorder links"
        );
      },
    });
  };