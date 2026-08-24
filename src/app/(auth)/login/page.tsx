import { Suspense } from "react";

import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-muted/30 p-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
