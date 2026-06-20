import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { purgeLink } from "./link.api";

export const usePurgeLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purgeLink,

    onSuccess: () => {
      queryClient.invalidateQueries();

      toast.success("Link permanently removed");
    },
  });
};