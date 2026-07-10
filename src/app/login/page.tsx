import { LoginForm } from "@/features/auth";
import { AuthCardShell } from "@/features/auth";

export default function LoginPage() {
  return (
    <AuthCardShell title="Вход в личный кабинет">
      <LoginForm />
    </AuthCardShell>
  );
}
