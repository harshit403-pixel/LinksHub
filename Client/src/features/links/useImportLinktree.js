import { useMutation } from "@tanstack/react-query";
import { importLinktree } from "./link.api";

export const useImportLinktree =
  () => {
    return useMutation({
      mutationFn: importLinktree,
    });
  };