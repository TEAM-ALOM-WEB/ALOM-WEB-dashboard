"use client";

import { MemberTable } from "@/features/members/components/MemberTable";
import { useMembers } from "@/features/members/hooks/useMembers";

export default function MembersPage() {
  const { data, isLoading } = useMembers();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">아롬인 관리</h1>
      <MemberTable data={data ?? []} isLoading={isLoading} />
    </div>
  );
}
