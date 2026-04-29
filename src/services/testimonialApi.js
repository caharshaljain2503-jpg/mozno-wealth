import apiClient from "../api/axios.instance";

export const testimonialApi = {
  getTestimonials: async (params = {}) => {
    const response = await apiClient.get("/testimonials/public", { params });
    return response;
  },
};