import { useQuery } from "@tanstack/react-query";

import { getProjects } from "@/features/projects/services/api";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}
