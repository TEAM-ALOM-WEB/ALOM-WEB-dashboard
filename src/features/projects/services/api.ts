import { api } from "@/lib/axios";
import type { Project } from "@/features/projects/types";

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>("/projects");
  return data;
}
