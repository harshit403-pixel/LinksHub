import { useQuery } from "@tanstack/react-query";
import { getLinkAnalytics } from "../links/link.api";

export const useLinkAnalytics = (
  linkId
) => {
  return useQuery({
    queryKey: [
      "link-analytics",
      linkId,
    ],
    queryFn: () =>
      getLinkAnalytics(linkId),
    enabled: !!linkId,
  });
};