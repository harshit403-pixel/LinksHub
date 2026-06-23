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

export const deleteLink = async (id) => {
  const { data } = await axiosInstance.delete(
    `/links/${id}`
  );

  return data;
};

export const getDeletedLinks = async () => {
  const { data } = await axiosInstance.get(
    "/links/deleted"
  );

  return data;
};

export const restoreLink = async (id) => {
  const { data } = await axiosInstance.patch(
    `/links/deleted/${id}/restore`
  );

  return data;
};

export const purgeLink = async (id) => {
  const { data } = await axiosInstance.delete(
    `/links/deleted/${id}`
  );

  return data;
};

export const updateLink = async (
  id,
  payload
) => {
  const { data } = await axiosInstance.patch(
    `/links/${id}`,
    payload
  );

  return data;
};

export const getLinkAnalytics = async (
  id
) => {
  const { data } =
    await axiosInstance.get(
      `/links/analytics/${id}`
    );

  return data;
};

export const reorderLinks = async (
  links
) => {
  const { data } =
    await axiosInstance.patch(
      "/links/reorder",
      {
        links,
      }
    );

  return data;
};