import { useMutation } from "@tanstack/react-query";
import { searchProfile } from "./profile.api";

export const useProfileAISearch = () => {
  return useMutation({
    mutationFn: searchProfile,
  });
};