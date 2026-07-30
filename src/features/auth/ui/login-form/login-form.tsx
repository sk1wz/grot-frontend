"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { login, type LoginResponse } from "../../api";
import { ArrowRightToLine, EyeIcon, EyeOffIcon } from "lucide-react";
import { Text } from "@/shared/ui";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
    <form
      className="flex flex-1 flex-col gap-4"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <label className="flex flex-col gap-2" htmlFor="email">
        <span className="text-sm font-medium text-(--foreground)">
          Введите Email
        </span>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="off"
          suppressHydrationWarning
          className="w-full rounded-full bg-white px-5 py-3.5 text-(--foreground) shadow-(--shadow-2) outline-none placeholder:text-(--foreground)"
        />
      </label>

      <label className="flex flex-col gap-2" htmlFor="password">
        <span className="text-sm font-medium text-(--foreground)">
          Введите пароль
        </span>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            required
            autoComplete="off"
            suppressHydrationWarning
            className="w-full rounded-full bg-white px-5 py-3.5 pr-12 text-(--foreground) shadow-(--shadow-2) outline-none placeholder:text-(--foreground)"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1 opacity-70 transition-opacity hover:opacity-100"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? (
              <EyeOffIcon color="black" size={20} />
            ) : (
              <EyeIcon color="black" size={20} />
            )}
          </button>
        </div>
      </label>

      <button
        type="submit"
        className="mt-1 w-full cursor-pointer rounded-full bg-(--accent) py-4 text-sm font-bold uppercase tracking-wide text-(--accent-foreground) shadow-(--shadow-1) transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--accent)/90 active:translate-y-0 active:scale-[0.98]"
      >
        Войти
      </button>

      <div className="flex items-end justify-between gap-4 pt-2">
        <div className="text-left text-sm text-(--foreground)">
          <p>У вас еще нет личного кабинета?</p>
          <Text>Зарегистрируйтесь</Text>
        </div>

        <Link
          href="/register"
          aria-label="Перейти к регистрации"
          className="flex h-10 w-10 shrink-0 items-center justify-center transition-opacity hover:opacity-70"
        >
          <ArrowRightToLine color="black" size={20} />
        </Link>
      </div>
    </form>
  );
}
