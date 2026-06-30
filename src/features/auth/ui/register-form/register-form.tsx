"use client";
import { AuthForm } from "@/shared/ui";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { register, RegisterResponse } from "../../api";

export function RegisterForm() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const request = register(email, password);
    try {
      await toast.promise(request, {
        pending: "Регистрация в системе...",
        success: {
          render: ({ data }: { data: RegisterResponse }) =>
            `Вы успешно зарегистрировались в системе ${data.user.email}`,
        },
        error: {
          render: ({ data }: { data: Error }) => ` ${data.message}`,
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
      passwordAutoComplete="new-password"
      passwordMinLength={6}
      submitText="Зарегистрироваться"
      switchHref="/login"
      switchLinkText="Войти"
      switchText="Уже есть аккаунт?"
    />
  );
}
