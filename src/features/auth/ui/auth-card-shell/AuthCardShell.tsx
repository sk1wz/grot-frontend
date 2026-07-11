import Image from "next/image";
import type { ReactNode } from "react";

const AUTH_CARD_CLASS =
  "relative z-10 flex min-h-[650px] w-full max-w-[600px] flex-col rounded-[40px_150px_40px_150px] border-[10px] border-[#C9D5E5]/60 bg-transparent p-10 shadow-[0_24px_64px_rgba(62,60,75,0.12)] backdrop-blur-xl";

export function AuthCardShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-full items-center justify-center overflow-hidden p-2">
      <div className="relative w-full max-w-[600px]">
        <Image
          src="/Rectangle 159.png"
          alt=""
          aria-hidden
          width={320}
          height={320}
          priority
          className="pointer-events-none absolute -bottom-20 -right-20 z-0 w-[160px] select-none"
          style={{ height: "auto" }}
        />

        <div className={AUTH_CARD_CLASS}>
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
