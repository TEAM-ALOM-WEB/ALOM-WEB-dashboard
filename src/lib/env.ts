import { z } from "zod";

const envSchema = z.object({
  // 실제 백엔드 배포 전까지의 기본값. Vercel 프로젝트에 실제 값을 설정하면 우선 적용됨.
  NEXT_PUBLIC_API_BASE_URL: z.url().default("http://localhost:4000/api"),
  // Supabase 프로젝트를 만들기 전까지의 placeholder. 실제 값은 .env.local / Vercel 환경변수로 설정.
  NEXT_PUBLIC_SUPABASE_URL: z.url().default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default("placeholder-anon-key"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
