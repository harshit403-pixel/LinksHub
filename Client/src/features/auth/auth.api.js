import { axiosInstance } from "../../app/axios";

export const login = async (credentials) => {
  const { data } = await axiosInstance.post(
    "/auth/login",
    credentials
  );

  return data;
};

export const register = async (userData) => {
  const { data } = await axiosInstance.post(
    "/auth/register",
    userData
  );

  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};