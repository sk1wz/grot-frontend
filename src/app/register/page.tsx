import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/features/auth";

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-full items-center justify-center overflow-hidden bg-[#e5edd6] px-4 py-10 sm:px-6 sm:py-12">
      <div className="relative w-full max-w-[540px]">
        <Image
          src="/Rectangle 159.png"
          alt=""
          aria-hidden
          width={320}
          height={320}
          className="pointer-events-none absolute -bottom-16 -right-10 z-0 h-auto w-[220px] select-none sm:-bottom-20 sm:-right-6 sm:w-[280px] md:w-[320px]"
        />

        <div className="relative z-10 overflow-hidden rounded-[44px_28px_44px_28px] border border-white/70 bg-white/45 p-6 shadow-[0_24px_64px_rgba(62,60,75,0.12)] backdrop-blur-xl sm:p-8 md:p-10">
          <div className="mb-6 flex items-start justify-between sm:mb-8">
            <div className="rounded-[16px] bg-[#eef1f5] p-2 shadow-[0_12px_24px_rgba(62,60,75,0.12),inset_0_2px_4px_rgba(255,255,255,0.9)]">
              <Image
                src="/logo.png"
                alt="InfoFusion"
                width={44}
                height={44}
                className="h-11 w-11"
              />
            </div>

            <Link
              href="/"
              aria-label="Закрыть"
              className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#eef1f5] text-xl leading-none text-[#3e3c4b] shadow-[0_12px_24px_rgba(62,60,75,0.12),inset_0_2px_4px_rgba(255,255,255,0.9)] transition-opacity hover:opacity-70"
            >
              ×
            </Link>
          </div>

          <h1 className="mb-8 text-center text-2xl font-bold text-[#3e3c4b] sm:mb-10 sm:text-[28px]">
            Регистрация
          </h1>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
