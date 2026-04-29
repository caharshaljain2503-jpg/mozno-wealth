// hooks/useCareer.js
import { useQuery, useMutation } from "@tanstack/react-query";
import { careerApi } from "../services/CareerApi";
import { toast } from "sonner";

export const careerKeys = {
  all: ["careers"],
  lists: () => [...careerKeys.all, "list"],
  detail: (jobId) => [...careerKeys.all, "detail", jobId],
};

export const useJobs = (options = {}) => {
  return useQuery({
    queryKey: careerKeys.lists(),
    queryFn: async () => {
      const response = await careerApi.getAll();
      // Handle both patterns (with/without response interceptor)
      const data = response?.data || response;

      const posts = data || data?.data || data?.jobs || [];
        console.log(posts)
      if (!Array.isArray(posts)) {
        console.warn("Expected array, got:", posts);
        return [];
      }
      return posts;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useJob = (jobId, options = {}) => {
  return useQuery({
    queryKey: careerKeys.detail(jobId),
    queryFn: async () => {
      const response = await careerApi.getById(jobId);
      const data = response?.data || response;
      return data?.data || data?.job || data;
    },
    enabled: !!jobId,
    ...options,
  });
};

export const useApplyJob = (options = {}) => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await careerApi.applyJob(formData);
      return response?.data || response;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Application submitted successfully! 🎉");
    },
    onError: (error) => {
      console.error("Apply error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit. Please try again.";
      toast.error(message);
    },
    ...options,
  });
};

