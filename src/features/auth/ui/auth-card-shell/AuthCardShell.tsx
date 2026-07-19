import Image from "next/image";
import type { ReactNode } from "react";

import { Logo } from "@/shared/ui";

const AUTH_CARD_CLASS =
  "relative z-10 mx-auto flex min-h-[650px] w-full max-w-[550px] flex-col rounded-[40px_150px_40px_150px] bg-[#C9D5E5]/20 p-10 shadow-[inset_-6px_6px_8px_0_rgba(255,255,255,0.45),inset_6px_-6px_8px_0_rgba(255,255,255,0.45),inset_6px_6px_8px_0_rgba(255,255,255,0.45),inset_-6px_-6px_8px_0_rgba(255,255,255,0.45),inset_-12px_12px_14px_0_rgba(212,221,234,0.65),inset_12px_-12px_14px_0_rgba(212,221,234,0.65),inset_12px_12px_14px_0_rgba(212,221,234,0.65),inset_-12px_-12px_14px_0_rgba(212,221,234,0.65)]";

export function AuthCardShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-full items-center justify-center p-2">
      <div className="relative h-full w-full">
        <Image
          src="/auth_figure.png"
          alt=""
          aria-hidden
          width={320}
          height={320}
          priority
          className="pointer-events-none absolute -right-20 -bottom-20 z-0 select-none"
        />

        <div className={AUTH_CARD_CLASS}>
          <div className="absolute top-6 left-6 z-20 sm:top-8 sm:left-8">
            <Logo />
          </div>

          <h1 className="relative z-10 mb-8 shrink-0 text-center text-2xl font-bold text-[#3e3c4b] sm:mb-10 sm:text-[28px]">
            {title}
          </h1>

          <div className="relative z-10 mx-auto flex w-full max-w-[400px] flex-1 flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
