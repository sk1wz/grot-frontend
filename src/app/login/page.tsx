import { LoginForm } from "@/features/auth";
import { AuthCardShell } from "@/features/auth";

export default function LoginPage() {
  return (
    <AuthCardShell title="Личный кабинет">
      <LoginForm />
    </AuthCardShell>
  );
}
