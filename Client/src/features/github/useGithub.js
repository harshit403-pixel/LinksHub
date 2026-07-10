import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  connectGithub,
  disconnectGithub,
  getGithubConnection,
  getGithubRepositories,
  importGithubRepositories,
} from "./github.api";

import { toast } from "sonner";


export const useGithubConnection = () =>
  useQuery({
    queryKey: ["github-connection"],
    queryFn: getGithubConnection,
  });

export const useGithubRepositories = () =>
    useQuery({
      queryKey: ["github-repositories"],
      queryFn: getGithubRepositories,
      enabled: true,
    });

export const useConnectGithub = () => ({
  connect: connectGithub,
});

export const useDisconnectGithub = () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: disconnectGithub,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "github-connection",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "github-repositories",
          ],
        });
      },
    });
  };




  export const useImportGithubRepositories = () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        importGithubRepositories,

      onSuccess: () => {
        toast.success(
          "Repositories imported successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "knowledge",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "github-repositories",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to import repositories."
        );
      },
    });
  };