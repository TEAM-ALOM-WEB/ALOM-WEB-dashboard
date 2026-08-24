import { z } from "zod";

const envSchema = z.object({
  // 실제 백엔드 배포 전까지의 기본값. Vercel 프로젝트에 실제 값을 설정하면 우선 적용됨.
  NEXT_PUBLIC_API_BASE_URL: z.url().default("http://localhost:4000/api"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
