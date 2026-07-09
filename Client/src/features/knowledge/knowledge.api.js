import { axiosInstance } from "../../app/axios";

export const importProject = async (githubUrl) => {
  const { data } = await axiosInstance.post(
    "/knowledge/project/import",
    {
      githubUrl,
    }
  );

  return data;
};

export const getKnowledge = async () => {
  const { data } = await axiosInstance.get(
    "/knowledge"
  );

  return data;
};

export const deleteProject = async (
  id
) => {
  const { data } =
    await axiosInstance.delete(
      `/knowledge/${id}`
    );

  return data;
};