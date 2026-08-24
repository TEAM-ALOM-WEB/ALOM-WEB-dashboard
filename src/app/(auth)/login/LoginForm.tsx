"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuthCookie } from "@/lib/auth-cookie";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
  email: z.email("올바른 이메일을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type LoginForm = z.infer<typeof loginSchema>;

// 백엔드 로그인 API가 준비되기 전까지 사용하는 임시 테스트 계정.
const TEST_ADMIN = {
  email: "admin@alom.dev",
  password: "alomAdmin123",
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    // TODO: 커스텀 REST API의 로그인 엔드포인트로 교체
    if (values.email !== TEST_ADMIN.email || values.password !== TEST_ADMIN.password) {
      setError("password", { message: "이메일 또는 비밀번호가 올바르지 않습니다." });
      return;
    }

    const fakeToken = "dev-token";
    setAuthCookie(fakeToken);
    setSession(
      { id: "dev-admin", name: "테스트 관리자", email: values.email, role: "SUPER_ADMIN" },
      fakeToken
    );
    toast.success("로그인되었습니다.");
    router.push(searchParams.get("from") ?? "/");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>ALOM Admin 로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
          테스트 계정: {TEST_ADMIN.email} / {TEST_ADMIN.password}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            로그인
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
