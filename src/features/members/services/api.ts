import { mockMembers } from "@/features/members/data/mock-members";
import type { Member } from "@/features/members/types";

// TODO: 커스텀 REST API의 /members 엔드포인트로 교체
export async function getMembers(): Promise<Member[]> {
  return mockMembers;
}

export async function getMember(id: string): Promise<Member | undefined> {
  return mockMembers.find((member) => member.id === id);
}
