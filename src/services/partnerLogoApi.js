import apiClient from "../api/axios.instance";

export const partnerLogoApi = {
  getPublic: () => apiClient.get("/partner-logos/public"),
};
