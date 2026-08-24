import { useQuery } from "@tanstack/react-query";

import { getMember, getMembers } from "@/features/members/services/api";

export function useMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });
}

export function useMember(id: string) {
  return useQuery({
    queryKey: ["members", id],
    queryFn: () => getMember(id),
    enabled: Boolean(id),
  });
}
