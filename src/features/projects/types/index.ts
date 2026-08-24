export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  memberIds: string[];
  isFeatured: boolean;
}
