"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowRightToLine, EyeIcon, EyeOffIcon } from "lucide-react";
import { register, RegisterResponse } from "../../api";
import { Text } from "@/shared/ui";

function PasswordField({
  id,
  name,
  label,
  placeholder,
  show,
  onToggle,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
  autoComplete: "new-password" | "current-password";
}) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-sm font-medium text-[#3e3c4b]">{label}</span>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          required
          minLength={6}
          autoComplete={autoComplete}
          suppressHydrationWarning
          className="w-full rounded-full bg-white px-5 py-3.5 pr-12 text-[#3e3c4b] shadow-[inset_0_2px_6px_rgba(163,177,198,0.28)] outline-none placeholder:text-[#3e3c4b]"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1 opacity-70 transition-opacity hover:opacity-100"
          aria-label={show ? "Скрыть пароль" : "Показать пароль"}
        >
          {show ? (
            <EyeOffIcon color="black" size={20} />
          ) : (
            <EyeIcon color="black" size={20} />
          )}
        </button>
      </div>
    </label>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const confirmPassword = String(fd.get("confirmPassword") ?? "");
    const consent = fd.get("consent");

    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    if (!consent) {
      toast.error("Необходимо согласие на обработку персональных данных");
      return;
    }

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
    <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2" htmlFor="email">
        <span className="text-sm font-medium text-[#3e3c4b]">
          Введите Email
        </span>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          suppressHydrationWarning
          className="w-full rounded-full bg-white px-5 py-3.5 text-[#3e3c4b] shadow-[inset_0_2px_6px_rgba(163,177,198,0.28)] outline-none placeholder:text-[#3e3c4b]"
        />
      </label>

      <PasswordField
        id="password"
        name="password"
        label="Введите пароль"
        placeholder="Пароль"
        show={showPassword}
        onToggle={() => setShowPassword((value) => !value)}
        autoComplete="new-password"
      />

      <PasswordField
        id="confirmPassword"
        name="confirmPassword"
        label="Повторите пароль"
        placeholder="Пароль"
        show={showConfirmPassword}
        onToggle={() => setShowConfirmPassword((value) => !value)}
        autoComplete="new-password"
      />

      <label className="flex items-start gap-3 pt-1">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border border-[#c5ceda] accent-[#3e3c4b]"
        />
        <span className="text-xs leading-snug text-[#3e3c4b]">
          Я даю согласие на обработку персональных данных в соответствии с
          политикой конфиденциальности
        </span>
      </label>

      <button
        type="submit"
        className="mt-1 w-full cursor-pointer rounded-full bg-[#c8ddd5] py-4 text-sm font-bold uppercase tracking-wide text-[#3e3c4b] shadow-[0_18.667px_18.667px_rgba(62,60,75,0.24),inset_0_-5.849px_5.849px_0px_#adadad,inset_0_5.849px_5.849px_0px_#ffffff] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b8d4c8] active:translate-y-0 active:scale-[0.98]"
      >
        Зарегистрироваться
      </button>

      <div className="flex items-end justify-between gap-4 pt-2">
        <div className="text-left text-sm text-[#3e3c4b]">
          <p>У вас уже есть аккаунт?</p>
          <Text>Войти</Text>
        </div>

        <Link
          href="/login"
          aria-label="Перейти ко входу"
          className="flex h-10 w-10 shrink-0 items-center justify-center transition-opacity hover:opacity-70"
        >
          <ArrowRightToLine color="black" size={20} />
        </Link>
      </div>
    </form>
  );
}
