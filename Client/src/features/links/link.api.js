import { axiosInstance } from "../../app/axios";

export const createLink = async (linkData) => {
  const { data } = await axiosInstance.post(
    "/links",
    linkData
  );

  return data;
};

export const getLinksByUsername = async (username) => {
  const { data } = await axiosInstance.get(
    `/links/${username}`
  );

  return data;
};