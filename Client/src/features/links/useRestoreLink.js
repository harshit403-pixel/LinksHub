import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { restoreLink } from "./link.api";

export const useRestoreLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreLink,

    onSuccess: () => {
      queryClient.invalidateQueries();

      toast.success("Link restored");
    },
  });
};