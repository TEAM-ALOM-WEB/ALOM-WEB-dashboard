import type { Role } from "@/store/authStore";

export type Track = "FRONTEND" | "BACKEND" | "DESIGN" | "PM";

export interface Member {
  id: string;
  name: string;
  email: string;
  cohort: number;
  role: Role;
  track: Track;
  portfolioUrl: string | null;
}
