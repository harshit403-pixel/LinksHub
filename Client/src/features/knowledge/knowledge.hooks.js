import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProject,
  getKnowledge,
  importProject,
} from "./knowledge.api";
import { toast } from "sonner";
import { useAuth } from "../auth/useAuth";


export const useKnowledge = () => {
  const { data: authData } = useAuth();

  return useQuery({
    queryKey: [
      "knowledge",
      authData?.user?._id,
    ],
    queryFn: getKnowledge,
    enabled: !!authData?.user?._id,
  });
};

export const useImportProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["knowledge"],
      });
      
    },
      
onError: (error) => {
  toast.error(
    error.response?.data?.message ||
    "Failed to import repository."
  );
},
  });
};


export const useDeleteProject = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      toast.success(
        "Project deleted."
      );

      queryClient.invalidateQueries({
        queryKey: ["knowledge"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Couldn't delete project."
      );
    },
  });
};