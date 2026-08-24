import { api } from "@/lib/axios";
import type { Member } from "@/features/members/types";

export async function getMembers(): Promise<Member[]> {
  const { data } = await api.get<Member[]>("/members");
  return data;
}

export async function getMember(id: string): Promise<Member> {
  const { data } = await api.get<Member>(`/members/${id}`);
  return data;
}
