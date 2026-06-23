import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  uploadProfilePicture,
} from "./auth.api";

import { toast } from "sonner";

export const useUploadProfilePicture =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        uploadProfilePicture,

     onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["auth"],
  });

  queryClient.invalidateQueries({
    queryKey: ["links"],
  });


        toast.success(
          "Profile picture updated"
        );
      },

      onError: () => {
        toast.error(
          "Upload failed"
        );
      },
    });
  };