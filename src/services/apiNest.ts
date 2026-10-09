// apiNest.ts
import axios, { AxiosError } from "axios";

export const apiNest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiNest.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiNest.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string | string[] }>) => {
    const msg = error.response?.data?.message;
    error.message = Array.isArray(msg)
      ? msg.join(", ")
      : (msg ?? error.message);
    return Promise.reject(error);
  },
);
