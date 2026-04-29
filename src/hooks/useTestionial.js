import { useQuery } from "@tanstack/react-query";
import { testimonialApi } from "../services/testimonialApi";

// Query keys
export const testimonialKeys = {
  all: ["testimonials"],
  lists: () => [...testimonialKeys.all, "list"],
  list: (filters) => [...testimonialKeys.lists(), filters],
};

// Get all testimonials (with optional featured filter)
export const useTestimonials = (options = {}) => {
  const { featured, limit = 10 } = options;

  return useQuery({
    queryKey: testimonialKeys.list({ featured, limit }),
    queryFn: () => testimonialApi.getTestimonials({ 
      featured: featured ? "true" : undefined, 
      limit 
    }),
    select: (response) => response.testimonials || [],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
  });
};

// Get all testimonials (no filters)
export const useAllTestimonials = (limit = 10) => {
  return useTestimonials({ limit });
};

// Get only featured testimonials
export const useFeaturedTestimonials = (limit = 5) => {
  return useTestimonials({ featured: true, limit });
};