"use client";

import { useUserStore } from "@/entities/user";
import { changePassword } from "@/entities/user/api/change-password";
import { DashboardPageFrame, Input } from "@/shared/ui";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

function PasswordInput({
  label,
  value,
  onChange,
  visible,
  toggle,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  toggle: () => void;
  autoComplete: "current-password" | "new-password";
}) {
  return (
    <label className="relative block">
      <span className="absolute -top-5 left-3 text-sm font-bold uppercase text-[#868a85]">
        {label}
      </span>
      <span className="relative block">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder="Введите пароль"
          className="min-h-11 bg-white px-4 py-5 pr-12 text-sm text-[#1f2937] shadow-[0_3px_9px_rgba(15,23,42,0.18)] placeholder:text-[#d5e0ec]"
        />
        <button
          type="button"
          onClick={toggle}
          title={visible ? "Скрыть пароль" : "Показать пароль"}
          className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center text-[#d4ddea]"
        >
          {visible ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </span>
    </label>
  );
}

export default function ChangePasswordPage() {
  const user = useUserStore((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [visible, setVisible] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword.length < 6)
      return toast.error("Новый пароль должен содержать не менее 6 символов");
    if (newPassword !== confirmation)
      return toast.error("Новые пароли не совпадают");
    setPending(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmation("");
      toast.success("Пароль успешно изменён");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Не удалось изменить пароль"
      );
    } finally {
      setPending(false);
    }
  }
  const field = (
    key: string,
    label: string,
    value: string,
    setValue: (value: string) => void,
    autoComplete: "current-password" | "new-password"
  ) => (
    <PasswordInput
      label={label}
      value={value}
      onChange={setValue}
      visible={visible === key}
      toggle={() => setVisible(visible === key ? null : key)}
      autoComplete={autoComplete}
    />
  );
  return (
    <DashboardPageFrame
      as="section"
      figureSrc="/images/change-password-figure.png"
      figurePriority
      figureClassName="pointer-events-none fixed top-0 right-0 z-0 hidden h-[254px] w-[283px] object-cover opacity-50 select-none lg:block"
      wrapperClassName="relative min-h-full overflow-hidden pb-2 text-(--foreground)"
      className="relative z-10 min-h-[632px] w-full bg-white px-5 pt-10 pb-20 sm:px-10 md:rounded-[70px_10px_70px_10px] md:border-[5px] md:border-[rgba(201,213,229,0.4)]"
    >
      <h1 className="text-(--foreground) text-[32px] font-medium leading-none">
        Смена пароля
      </h1>
      <div className="mt-8">
        <h2 className="text-(--foreground) text-[24px] font-medium leading-none">
          Профиль
        </h2>
        <div className="mt-4 flex items-center gap-5 text-(--foreground) text-[18px] font-semibold uppercase underline">
          <Image src="/images/Icon.svg" width={44} height={44} alt="" />
          {user?.email ?? "—"}
        </div>
      </div>
      <form
        onSubmit={submit}
        className="mx-auto mt-16 w-full max-w-[396px] space-y-7"
      >
        {field(
          "current",
          "Пароль",
          currentPassword,
          setCurrentPassword,
          "current-password"
        )}
        {field(
          "new",
          "Новый пароль",
          newPassword,
          setNewPassword,
          "new-password"
        )}
        {field(
          "confirm",
          "Повторите пароль",
          confirmation,
          setConfirmation,
          "new-password"
        )}
        <button
          type="submit"
          disabled={pending}
          className="h-17.5 w-full cursor-pointer rounded-[20px] bg-[#c8ddd5] px-3 font-bold uppercase shadow-(--shadow-1) transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Сохранение..." : "Сохранить изменения"}
        </button>
      </form>
    </DashboardPageFrame>
  );
}
