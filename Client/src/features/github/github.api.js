import { axiosInstance } from "../../app/axios";


export const connectGithub = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/github/connect`;
};

export const getGithubConnection = async () => {
  const { data } = await axiosInstance.get(
    "/github/me"
  );

  return data;
};

export const getGithubRepositories =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/github/repositories"
      );

    return data;
  };

export const disconnectGithub =
  async () => {
    const { data } =
      await axiosInstance.delete(
        "/github/disconnect"
      );

    return data;
  };


  export const importGithubRepositories =
  async (repositories) => {
    const { data } =
      await axiosInstance.post(
        "/github/import",
        {
          repositories,
        }
      );

    return data;
  };