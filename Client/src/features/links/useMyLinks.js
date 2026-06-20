import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../auth/useAuth";
import { getLinksByUsername } from "./link.api.js";

export const useMyLinks = () => {
  const { data: authData } = useAuth();

  const username = authData?.user?.username;

  return useQuery({
    queryKey: ["links", username],
    queryFn: () => getLinksByUsername(username),
    enabled: !!username,
  });
};