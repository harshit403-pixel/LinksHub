import { useQuery } from "@tanstack/react-query";
import { getDeletedLinks } from "./link.api";

export const useDeletedLinks = () => {
  return useQuery({
    queryKey: ["deleted-links"],
    queryFn: getDeletedLinks,
  });
}; 