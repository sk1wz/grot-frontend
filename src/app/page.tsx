import Image from "next/image";

import { Logo, Text } from "@/shared/ui";
import Link from "next/link";
import { ReactNode } from "react";

const watermarkShadow = [
  "drop-shadow(1px 1px 1px rgba(255, 255, 255, 0.75))",
  "drop-shadow(2px 3px 6px rgba(100, 115, 140, 0.55))",
  "drop-shadow(4px 7px 14px rgba(80, 95, 120, 0.45))",
  "drop-shadow(-1px -1px 2px rgba(255, 255, 255, 0.5))",
].join(" ");

function HeroButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex h-[52px] min-w-[160px] cursor-pointer items-center justify-center rounded-[20px] px-3 text-center text-md font-bold uppercase text-[#3e3c4b] transition-all duration-200 ease-out sm:h-[60px] sm:min-w-[180px]",
        "shadow-[0_18.667px_18.667px_rgba(62,60,75,0.24),inset_0_-5.849px_5.849px_0px_#adadad,inset_0_5.849px_5.849px_0px_#ffffff]",
        "hover:-translate-y-0.5 hover:shadow-[0_22px_24px_rgba(62,60,75,0.3),inset_0_-5.849px_5.849px_0px_#adadad,inset_0_5.849px_5.849px_0px_#ffffff]",
        "active:translate-y-0 active:scale-[0.98] active:shadow-[0_10px_14px_rgba(62,60,75,0.22),inset_0_-3px_5px_0px_#adadad,inset_0_4px_5px_0px_#ffffff]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e3c4b]/25",
        variant === "secondary"
          ? "bg-[#CDD3DA] hover:bg-[#c2c9d1]"
          : "bg-[#c8ddd5] hover:bg-[#b8d4c8]",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <header>
        <div className="flex items-center justify-between">
          <div>
            <Logo />
          </div>
          <div>
            <HeroButton href="/login" variant="secondary">
              ЛИЧНЫЙ КАБИНЕТ
            </HeroButton>
          </div>
        </div>
      </header>
      <div className="hero relative h-[600px] w-full ">
        <div className="absolute h-[600px] w-full max-w-full rounded-full bg-[#D4DDEA] blur-[100px]" />
        <span
          className="absolute top-10 left-20 z-0 inline-block whitespace-nowrap px-4 bg-[linear-gradient(90deg,rgba(62,60,75,0.2)_0%,#D4DDEA_4%,#FFFFFF_31%,#FFFFFF_60%,#D4DDEA_85%,rgba(62,60,75,0.2)_100%)] bg-clip-text bg-center bg-no-repeat bg-size-[calc(100%+1rem)_100%] text-[clamp(5rem,14vw,13rem)] font-black leading-[1.1] tracking-[-0.08em] text-transparent"
          style={{ filter: watermarkShadow }}
        >
          Info
        </span>
        <span
          className="absolute right-20 bottom-10 z-0 inline-block whitespace-nowrap px-4 bg-[linear-gradient(90deg,rgba(62,60,75,0.2)_0%,#D4DDEA_4%,#FFFFFF_31%,#FFFFFF_60%,#D4DDEA_85%,rgba(62,60,75,0.2)_100%)] bg-clip-text bg-center bg-no-repeat bg-size-[calc(100%+1rem)_100%] text-[clamp(5rem,14vw,13rem)] font-black leading-[1.1] tracking-[-0.08em] text-transparent"
          style={{ filter: watermarkShadow }}
        >
          Fusion
        </span>

        <Image
          src="/hero_figure_2.png"
          alt=""
          width={373}
          height={542}
          className="pointer-events-none absolute top-1/2 left-[47%] z-10 w-[clamp(9rem,28vw,23rem)] -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src="/hero_figure_1.png"
          alt=""
          width={500}
          height={500}
          className="pointer-events-none absolute top-[20%] right-[10%] z-10 w-[clamp(10rem,30vw,28rem)] translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute bottom-8 left-0 z-20 max-w-[clamp(20rem,30vw,27rem)] rounded-[34px] border-[3px] border-[#C9D5E5] bg-white/60 p-6 backdrop-blur-[88.16px] shadow-[inset_7.6px_-7.6px_7.6px_0_rgba(212,221,234,0.6),inset_15.2px_-15.2px_15.2px_0_rgba(212,221,234,0.6)]">
          <div className="mb-4">
            <Text className="text-xl font-semibold leading-relaxed">
              Единая платформа для проверки данных через ГИБДД, ФССП и другие
              ведомства.
            </Text>
          </div>

          <HeroButton
            href="/login"
            variant="primary"
            className="h-[60px] w-full max-w-[300px] min-w-0"
          >
            Стать клиентом
          </HeroButton>
        </div>
      </div>
    </div>
  );
}
