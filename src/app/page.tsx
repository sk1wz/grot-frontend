import Image from "next/image";
import { Montserrat_Underline } from "next/font/google";
import { FastForward, Orbit, ShieldCheck } from "lucide-react";

import { Logo, LogoName, Text } from "@/shared/ui";
import Link from "next/link";
import { ReactNode } from "react";

const montserratUnderline = Montserrat_Underline({
  subsets: ["cyrillic"],
  weight: "800",
  display: "swap",
});

const watermarkShadow = [
  "drop-shadow(1px 1px 1px rgba(255, 255, 255, 0.75))",
  "drop-shadow(2px 3px 6px rgba(100, 115, 140, 0.3))",
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
    <div className="max-w-365 pt-6 px-6 mx-auto overflow-hidden">
      <header>
        <div className="flex items-center justify-between">
          <div>
            <Logo />
          </div>
          <div>
            <HeroButton href="/login" variant="secondary">
              Личный кабинет
            </HeroButton>
          </div>
        </div>
      </header>
      <section className="relative h-150 w-full">
        <div className="absolute inset-0 w-full max-w-212.5 justify-self-center rounded-full bg-[#D4DDEA] blur-[50px]" />
        <span
          className={`${montserratUnderline.className} absolute top-[12%] left-[10%] z-0 inline-block whitespace-nowrap px-2 bg-[linear-gradient(90deg,rgba(62,60,75,0.2)_0%,#D4DDEA_4%,#FFFFFF_31%,#FFFFFF_60%,#D4DDEA_85%,rgba(62,60,75,0.2)_100%)] bg-clip-text bg-center bg-no-repeat bg-size-[calc(100%+1rem)_100%] text-[3.5rem] font-extrabold leading-[1.1] tracking-normal text-transparent sm:text-[clamp(3.75rem,8vw,8rem)] min-[950px]:top-[7%] min-[950px]:left-[23%]`}
          style={{ filter: watermarkShadow }}
        >
          Авто
        </span>
        <span
          className={`${montserratUnderline.className} absolute right-[0%] bottom-[49%] z-0 inline-block whitespace-nowrap px-2 bg-[linear-gradient(90deg,rgba(62,60,75,0.2)_0%,#D4DDEA_4%,#FFFFFF_31%,#FFFFFF_60%,#D4DDEA_85%,rgba(62,60,75,0.2)_100%)] bg-clip-text bg-center bg-no-repeat bg-size-[calc(100%+1rem)_100%] text-[3.5rem] font-extrabold leading-[1.1] tracking-normal text-transparent sm:text-[clamp(3.75rem,8vw,8rem)] min-[950px]:right-[16%] min-[950px]:bottom-[20%]`}
          style={{ filter: watermarkShadow }}
        >
          Синтез
        </span>

        <Image
          src="/mainImages/hero_figure_2.png"
          alt=""
          width={373}
          height={542}
          className="pointer-events-none absolute top-[35%] left-[44%] z-10 w-[clamp(11rem,45vw,14rem)] -translate-x-1/2 -translate-y-1/2 max-[500px]:w-[clamp(10rem,39vw,13rem)] min-[950px]:top-[42%]"
        />
        <Image
          src="/mainImages/hero_figure_1.png"
          alt=""
          width={500}
          height={500}
          className="pointer-events-none absolute top-[35%] right-[15%] z-10 w-[clamp(10rem,30vw,28rem)] translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute bottom-8 left-0 z-20 w-full max-w-[450px] rounded-tl-[34px] rounded-tr-[18px] rounded-br-[34px] rounded-bl-[18px] border-[3px] border-[#C9D5E5]/40 bg-white/20 px-8 py-6 shadow-(--panel-shadow) backdrop-blur-(--panel-blur)">
          <div className="mb-4">
            <span className="text-sm font-semibold leading-relaxed text-(--foreground) min-[950px]:text-xl">
              Единая платформа для проверки данных через ГИБДД, ФССП и другие
              ведомства.
            </span>
          </div>

          <HeroButton
            href="/login"
            variant="primary"
            className="h-[60px] w-full max-w-[300px] min-w-0"
          >
            Стать клиентом
          </HeroButton>
        </div>
      </section>
      <section className="relative flex h-full lg:min-h-[650px] w-full items-center py-12">
        <Image
          src="/mainImages/advantage_figure.png"
          alt=""
          width={373}
          height={542}
          className="pointer-events-none absolute top-50 -left-5 h-auto hidden lg:block w-[clamp(12rem,28vw,23rem)] -translate-y-1/2"
        />
        <div className="relative z-10 grid w-full grid-cols-1 items-center gap-3 px-1 sm:grid-cols-3 sm:gap-1 lg:ml-auto lg:mr-0">
          <div className="flex h-[86px] items-center justify-center gap-3 rounded-tl-[34px] rounded-tr-[18px] rounded-br-[34px] rounded-bl-[18px] border border-[#c9d5e5]/40 bg-white/20 px-5 text-center text-sm font-bold text-[#3e3c4b] shadow-(--panel-shadow) backdrop-blur-(--panel-blur)">
            <FastForward className="size-6 shrink-0 text-[#676978]" strokeWidth={2} />
            <span>Скорость</span>
          </div>
          <div className="flex h-[104px] items-center justify-center gap-3 rounded-[25px] border border-[#d4deeb] bg-white px-5 text-center text-sm font-bold text-[#3e3c4b] shadow-[0_12px_26px_rgba(78,92,112,0.16),inset_0_2px_12px_rgba(255,255,255,0.96)] sm:-translate-y-3">
            <ShieldCheck className="size-7 shrink-0 text-[#676978]" strokeWidth={1.8} />
            <span className="max-w-[132px]">Надежность данных</span>
          </div>
          <div className="flex h-[86px] items-center justify-center gap-3 rounded-tl-[34px] rounded-tr-[18px] rounded-br-[34px] rounded-bl-[18px] border border-[#c9d5e5]/40 bg-white/20 px-5 text-center text-sm font-bold text-[#3e3c4b] shadow-(--panel-shadow) backdrop-blur-(--panel-blur)">
            <Orbit className="size-7 shrink-0 text-[#676978]" strokeWidth={1.8} />
            <span>Технологии</span>
          </div>
        </div>
      </section>
      <section className="relative w-full">
        <h2 className="text-left text-4xl font-bold text-[#3E3C4B]">
          Доступные проверки
        </h2>
        <Image
          src="/mainImages/examination form.svg"
          alt="Доступные проверки"
          width={1024}
          height={768}
          draggable={false}
          className="pointer-events-none mt-8 h-auto w-full select-none [-webkit-user-drag:none]"
        />
      </section>
      <div className="relative mt-16">
        <Image
          src="/mainImages/footer_figure.png"
          alt=""
          width={373}
          height={542}
          draggable={false}
          className="pointer-events-none absolute -top-15 right-10 z-0 h-auto w-[clamp(9rem,30vw,20rem)] translate-x-[30%] -translate-y-[30%] select-none"
        />

        <footer className="relative z-10 grid min-h-[300px] grid-cols-[1fr_auto_1fr] items-center rounded-t-[34px] p-4 bg-(--panel-fill) shadow-(--panel-shadow) backdrop-blur-(--panel-blur)">
          <div className="self-start justify-self-start">
            <Logo />
          </div>
          <div className="col-start-2 self-center flex flex-col items-center gap-2 text-center text-[#3E3C4B]">
            <LogoName />
            <a
              className="text-base sm:text-lg font-bold text-[#3E3C4B]"
              href="tel:+78000000000"
            >
              +7 (800) 000-00-00
            </a>
            <a
              className="text-base sm:text-lg font-bold text-[#3E3C4B]"
              href="mailto:info@autosledrf.ru"
            >
              info@autosledrf.ru
            </a>
            <a
              className="mt-2 text-sm underline text-[#3E3C4B] font-semibold"
              href="/privacy-policy"
            >
              Политика конфиденциальности
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
