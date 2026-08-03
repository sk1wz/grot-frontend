import Image from "next/image";
import type { ReactNode } from "react";

import { Logo } from "@/shared/ui";

const AUTH_CARD_CLASS =
  "relative z-10 flex min-h-[600px] w-full flex-col items-center rounded-[40px_150px_40px_150px] bg-[#C9D5E5]/20 p-10 shadow-[inset_-6px_6px_8px_0_rgba(255,255,255,0.45),inset_6px_-6px_8px_0_rgba(255,255,255,0.45),inset_6px_6px_8px_0_rgba(255,255,255,0.45),inset_-6px_-6px_8px_0_rgba(255,255,255,0.45),inset_-12px_12px_14px_0_rgba(212,221,234,0.65),inset_12px_-12px_14px_0_rgba(212,221,234,0.65),inset_12px_12px_14px_0_rgba(212,221,234,0.65),inset_-12px_-12px_14px_0_rgba(212,221,234,0.65)]";

export function AuthCardShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-2">
      {/* Общая ширина с карточкой — % и translate считаются от неё, а не от экрана */}
      <div className="relative w-full max-w-[550px]">
        <Image
          src="/mainImages/auth_figure.png"
          alt=""
          aria-hidden
          width={320}
          height={320}
          priority
          className="pointer-events-none absolute -right-40 -bottom-40 select-none"
        />

        <div className={AUTH_CARD_CLASS}>
          <div className="absolute top-6 left-6 z-20">
            <Logo />
          </div>

          <h1 className="relative z-10 mb-8 shrink-0 text-center text-xl font-bold text-[#3e3c4b] sm:text-2xl">
            {title}
          </h1>

          <div className="relative z-10 flex w-full max-w-[400px] flex-1 flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
