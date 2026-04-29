// services/CareerApi.js
import apiClient from "../api/axios.instance";

export const careerApi = {
  getAll: async () => {
    const response = await apiClient.get("/career/");
    console.log("Raw API response:", response); // Debug this first
    return response;
  },

  getById: async (jobId) => {
    const response = await apiClient.get(`/career/${jobId}`);
    return response;
  },

  applyJob: async (formData) => {
    const response = await apiClient.post("/career/apply", formData, {
      headers: {
      "Content-Type": "multipart/form-data",
    },
    });
    return response;
  },
};