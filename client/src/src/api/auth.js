import axiosInstance from "./axiosInstance";

export const registerRequest = (user) => axiosInstance.post(`/users`, user);
