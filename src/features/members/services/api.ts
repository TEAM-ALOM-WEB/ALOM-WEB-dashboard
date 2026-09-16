import { supabase } from "@/lib/supabase/client";
import type { Member } from "@/features/members/types";

interface MemberRow {
  id: string;
  name: string;
  position: string;
  student_id: string;
  department: string;
}

function toMember(row: MemberRow): Member {
  return {
    id: row.id,
    name: row.name,
    position: row.position,
    studentId: row.student_id,
    department: row.department,
  };
}

// 직책 표기가 다르더라도 같은 등급으로 묶어 정렬: 회장 > 부회장 > 전 회장 > 전 부회장 > 국장 > 고문 > 국원/수습국원
const POSITION_RANK: Record<string, number> = {
  "회장": 0,
  "부회장": 10,
  "전 회장": 20,
  "전 부회장": 25,
  "기획국장": 30,
  "교육국장": 30,
  "행정국장": 30,
  "고문": 40,
  "기획국원": 50,
  "교육국원": 50,
  "행정국원": 50,
  "홍보국원": 50,
  "수습국원": 50,
};

function positionRank(position: string): number {
  return POSITION_RANK[position] ?? 99;
}

function byPosition(a: Member, b: Member): number {
  return positionRank(a.position) - positionRank(b.position) || a.name.localeCompare(b.name, "ko");
}

export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("id, name, position, student_id, department");

  if (error) throw error;
  return (data as MemberRow[]).map(toMember).sort(byPosition);
}

export async function getMember(id: string): Promise<Member | undefined> {
  const { data, error } = await supabase
    .from("members")
    .select("id, name, position, student_id, department")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? toMember(data as MemberRow) : undefined;
}
