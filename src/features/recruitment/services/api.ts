import { api } from "@/lib/axios";
import type { Applicant } from "@/features/recruitment/types";

export async function getApplicants(): Promise<Applicant[]> {
  const { data } = await api.get<Applicant[]>("/recruitment/applicants");
  return data;
}
