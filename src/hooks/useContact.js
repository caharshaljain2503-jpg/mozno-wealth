import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitContactForm } from "../services/contactApi";


export const useContactForm = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["contact-form"],
    mutationFn: submitContactForm,

    onSuccess: (data, variables) => {
      // Invalidate any related queries if needed
      queryClient.invalidateQueries({ queryKey: ["contacts"] });

      if (options.onSuccess) {
        options.onSuccess(data, variables);
      }
    },

    onError: (error, variables) => {
      console.error("Contact form submission failed:", {
        message: error.message,
        statusCode: error.statusCode,
        formData: {
          email: variables?.email,
          subject: variables?.subject,
        },
      });

      if (options.onError) {
        options.onError(error, variables);
      }
    },

    onSettled: (data, error, variables) => {
      if (options.onSettled) {
        options.onSettled(data, error, variables);
      }
    },

    // Retry configuration
    retry: (failureCount, error) => {
      // Don't retry on validation errors (4xx)
      if (error.statusCode >= 400 && error.statusCode < 500) {
        return false;
      }
      // Retry up to 2 times on server errors
      return failureCount < 2;
    },

    retryDelay: (attemptIndex) => {
      return Math.min(1000 * 2 ** attemptIndex, 10000);
    },
  });

  return {
    // Core mutation
    submitForm: mutation.mutate,
    submitFormAsync: mutation.mutateAsync,

    // State
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,

    // Data
    data: mutation.data,
    error: mutation.error,
    errorMessage:
      mutation.error?.message ||
      "Failed to send message. Please try again later.",

    // Utilities
    reset: mutation.reset,
    status: mutation.status,
  };
};

export default useContactForm;