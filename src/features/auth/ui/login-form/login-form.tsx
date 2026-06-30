"use client";
import { AuthForm } from "@/shared/ui";
import { login, type LoginResponse } from "../../api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const request = login(email, password);
    try {
      await toast.promise(request, {
        pending: "Вход в систему...",
        success: {
          render: ({ data }: { data: LoginResponse }) =>
            `Вы успешно вошли в систему ${data.user.email}`,
        },
        error: {
          render: ({ data }: { data: Error }) => `${data.message}`,
        },
      });
      router.push("/dashboard");
    } catch {
      // Ошибка уже показана через toast.promise
    }
  };
  return (
    <AuthForm
      onSubmit={handleSubmit}
      passwordAutoComplete="current-password"
      submitText="Войти"
      switchHref="/register"
      switchLinkText="Зарегистрироваться"
      switchText="Нет аккаунта?"
    />
  );
}
