import { useQuery } from "@tanstack/react-query";
import { partnerLogoApi } from "../services/partnerLogoApi";

export const partnerLogoKeys = {
  public: ["partner-logos", "public"],
};

export const usePublicPartnerLogos = (options = {}) => {
  return useQuery({
    queryKey: partnerLogoKeys.public,
    queryFn: () => partnerLogoApi.getPublic(),
    select: (data) => data?.partnerLogos ?? [],
    staleTime: 5 * 60 * 1000,
    retry: 1,
    ...options,
  });
};
