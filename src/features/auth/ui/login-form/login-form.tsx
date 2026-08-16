"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { login, type LoginResponse } from "../../api";
import { ArrowRightToLine, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button, Input, Text, TextParagraph } from "@/shared/ui";

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
      <label className="flex flex-col gap-1" htmlFor="email">
        <Text className="font-medium ">
          Введите Email
        </Text>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="other"
          suppressHydrationWarning
        />
      </label>

      <label className="flex flex-col gap-2" htmlFor="password">
        <Text className="font-medium">
          Введите пароль
        </Text>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            required
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
            data-form-type="other"
            suppressHydrationWarning
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1 opacity-70 transition-opacity hover:opacity-100"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? (
              <EyeOffIcon className="text-[#d4ddea]" size={20} />
            ) : (
              <EyeIcon className="text-[#d4ddea]" size={20} />
            )}
          </button>
        </div>
      </label>

      <Button
        type="submit"
        className="uppercase font-medium py-4!"
      >
        Войти
      </Button>

      <div className="flex items-end justify-between gap-4 pt-2">
        <div>
          <TextParagraph>У вас еще нет личного кабинета?</TextParagraph>
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
