import axios from "axios";
import { toast } from "sonner";

const defaultBaseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://mozno-server-zeta.vercel.app/api";

const apiClient = axios.create({
  baseURL: defaultBaseURL,

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    toast.error("Server error");
    return Promise.reject(error);
  },
);

export default apiClient;
