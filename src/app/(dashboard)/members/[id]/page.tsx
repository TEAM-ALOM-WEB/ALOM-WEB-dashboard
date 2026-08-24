"use client";

import { use } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMember } from "@/features/members/hooks/useMembers";

export default function MemberDetailPage({ params }: PageProps<"/members/[id]">) {
  const { id } = use(params);
  const { data: member, isLoading } = useMember(id);

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (!member) {
    return <p className="text-muted-foreground">아롬인을 찾을 수 없습니다.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{member.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <p>기수: {member.cohort}</p>
        <p>파트: {member.track}</p>
        <p>권한: {member.role}</p>
        <p>이메일: {member.email}</p>
      </CardContent>
    </Card>
  );
}
