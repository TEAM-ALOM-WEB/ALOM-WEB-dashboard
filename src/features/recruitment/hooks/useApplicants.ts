import { useQuery } from "@tanstack/react-query";

import { getApplicants } from "@/features/recruitment/services/api";

export function useApplicants() {
  return useQuery({
    queryKey: ["applicants"],
    queryFn: getApplicants,
  });
}
