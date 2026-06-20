import { useQuery } from "@tanstack/react-query";
import { getMe } from "./auth.api";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};