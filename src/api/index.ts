import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  function (config) {
    try {
      const token = `Bearer ${localStorage.getItem("token") || ""}`;
      
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }

      config.headers.Authorization = token;
      config.validateStatus = (status: number) => status >= 200 && status < 300;
    } catch (error) {
      console.error("Error setting request config:", error);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  function (error) {
    return Promise.reject(error?.response ?? error);
  }
);


export { api };