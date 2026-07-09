import { axiosInstance } from "../../app/axios";

export const searchProfile = async ({
  username,
  query,
}) => {
  const { data } = await axiosInstance.post(
    `/knowledge/search`,
    {
      username,
      query,
    }
  );

  return data;
};