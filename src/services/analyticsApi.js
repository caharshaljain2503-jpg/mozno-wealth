// src/services/analyticsApi.js
import apiClient from "../api/axios.instance";

export const analyticsApi = {
  // Track page visit
  trackVisit: async (data) => {
    const response = await apiClient.post("/analytics/track-visit", data);
    return response.data;
  },

  // Update session duration
  updateDuration: async (sessionId, duration) => {
    const response = await apiClient.post("/analytics/update-duration", {
      sessionId,
      duration,
    });
    return response.data;
  },
};