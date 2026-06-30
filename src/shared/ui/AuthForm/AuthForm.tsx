"use client";

import Link from "next/link";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

type AuthFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  submitText: string;
  switchText: string;
  switchLinkText: string;
  switchHref: string;
  passwordAutoComplete: "current-password" | "new-password";
  passwordMinLength?: number;
};

export const AuthForm = ({
  onSubmit,
  submitText,
  switchText,
  switchLinkText,
  switchHref,
  passwordAutoComplete,
  passwordMinLength,
}: AuthFormProps) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-(--foreground)">
        Email
        <Input
          autoComplete="email"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-(--foreground)">
        Пароль
        <Input
          autoComplete={passwordAutoComplete}
          minLength={passwordMinLength}
          name="password"
          placeholder="••••••••"
          required
          type="password"
        />
      </label>
      <Button className="rounded-full!" type="submit">
        {submitText}
      </Button>
      <p className="text-center text-sm text-(--foreground)">
        {switchText}{" "}
        <Link
          className="font-medium text-(--accent) underline"
          href={switchHref}
        >
          {switchLinkText}
        </Link>
      </p>
    </form>
  );
};
