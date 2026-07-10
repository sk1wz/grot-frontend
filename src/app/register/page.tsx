import { RegisterForm } from "@/features/auth";
import { AuthCardShell } from "@/features/auth";

export default function RegisterPage() {
  return (
    <AuthCardShell title="Регистрация">
      <RegisterForm />
    </AuthCardShell>
  );
}
