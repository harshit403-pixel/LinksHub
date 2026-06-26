import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { bulkCreateLinks }
from "./link.api";

export const useBulkCreateLinks =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        bulkCreateLinks,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["links"],
        });
      },
    });
  };