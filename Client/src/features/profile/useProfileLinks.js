import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getLinksByUsername } from "../links/link.api";

export const useProfileLinks = () => {
  const { username } = useParams();

  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => getLinksByUsername(username),
    enabled: !!username,
  });
};