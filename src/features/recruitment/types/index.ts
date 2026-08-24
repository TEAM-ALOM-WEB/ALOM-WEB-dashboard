export type ApplicantStage = "DOCUMENT" | "INTERVIEW" | "PASSED" | "REJECTED";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  track: string;
  stage: ApplicantStage;
  score: number | null;
}
