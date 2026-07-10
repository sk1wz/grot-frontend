import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function HeroButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex h-[52px] min-w-[160px] cursor-pointer items-center justify-center rounded-[20px] px-3 text-center text-sm font-bold uppercase text-[#3e3c4b] transition-all duration-200 ease-out sm:h-[60px] sm:min-w-[180px]",
        "shadow-[0_18.667px_18.667px_rgba(62,60,75,0.24),inset_0_-5.849px_5.849px_0px_#adadad,inset_0_5.849px_5.849px_0px_#ffffff]",
        "hover:-translate-y-0.5 hover:shadow-[0_22px_24px_rgba(62,60,75,0.3),inset_0_-5.849px_5.849px_0px_#adadad,inset_0_5.849px_5.849px_0px_#ffffff]",
        "active:translate-y-0 active:scale-[0.98] active:shadow-[0_10px_14px_rgba(62,60,75,0.22),inset_0_-3px_5px_0px_#adadad,inset_0_4px_5px_0px_#ffffff]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e3c4b]/25",
        variant === "secondary"
          ? "bg-[#CDD3DA] hover:bg-[#c2c9d1]"
          : "bg-[#c8ddd5] hover:bg-[#b8d4c8]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[720px] w-full">
      <Image
        src="/herobackground.png"
        alt=""
        aria-hidden
        width={1440}
        height={720}
        priority
        draggable={false}
        className="pointer-events-none absolute left-0 top-0 z-0 block h-full w-full select-none object-cover object-top"
      />

      <div
        className="pointer-events-none absolute inset-0 z-1 hidden select-none md:block"
        aria-hidden
      >
        <span className="hero-watermark absolute left-[30%] top-[16%] -translate-x-1/2 text-[clamp(3.5rem,10vw,8.75rem)] font-black leading-[0.9] tracking-[-0.04em] sm:left-[32%] sm:top-[18%] md:left-[34%] md:top-[19%]">
          Info
        </span>
        <span className="hero-watermark absolute left-[66%] top-[51%] -translate-x-1/2 text-[clamp(3.5rem,10vw,8.75rem)] font-black leading-[0.9] tracking-[-0.04em]">
          Fusion
        </span>
      </div>

      <Image
        src="/picture1.png"
        alt=""
        aria-hidden
        width={366}
        height={540}
        priority
        draggable={false}
        className="pointer-events-none absolute left-[46%] top-[12%] z-2 h-auto w-[28vw] max-w-[360px] min-w-[160px] -translate-x-1/2 select-none"
      />

      <Image
        src="/picture2.png"
        alt=""
        aria-hidden
        width={562}
        height={458}
        priority
        draggable={false}
        className="pointer-events-none absolute right-0 top-[8%] z-3 h-auto w-[40vw] max-w-[520px] min-w-[220px] select-none"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1350px] flex-col px-4 pb-8 pt-4 md:px-8">
        <div className="flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="InfoFusion logo"
            width={120}
            height={120}
            priority
          />

          <HeroButton href="/login" variant="primary">
            ЛИЧНЫЙ КАБИНЕТ
          </HeroButton>
        </div>

        <div className="max-w-[448px] pt-40">
          <p className="text-xl font-medium leading-snug text-[#3e3c4b]">
            Единая платформа для проверки данных через ГИБДД, ФССП и другие
            ведомства.
          </p>

          <div className="mt-5 flex flex-wrap gap-4">
            <HeroButton href="/register" variant="primary">
              Стать клиентом
            </HeroButton>
            <HeroButton href="/login" variant="secondary">
              Смотреть тарифы
            </HeroButton>
          </div>
        </div>
      </div>
    </section>
  );
}
