import { axiosInstance } from "../../app/axios";

export const generateBio =
  async (payload) => {
    const { data } =
      await axiosInstance.post(
        "/ai/generate-bio",
        payload
      );

    return data;
  };