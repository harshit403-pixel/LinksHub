import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteLink } from "./link.api";

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });

      toast.success("Link deleted");
    },
  });
};