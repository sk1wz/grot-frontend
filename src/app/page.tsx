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
        "inline-flex h-[52px] min-w-[160px] items-center justify-center rounded-[20px] px-3 text-center text-sm font-bold uppercase text-[#3e3c4b] sm:h-[60px] sm:min-w-[180px]",
        "shadow-[0_18.667px_18.667px_rgba(62,60,75,0.24),inset_0_-5.849px_5.849px_0px_#adadad,inset_0_5.849px_5.849px_0px_#ffffff]",
        variant === "secondary" ? "bg-[#f3f3f3]" : "bg-[#c8ddd5]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
      <section className="relative h-[min(660px,92vw)] w-full overflow-hidden">
        <Image
          src="/Group 3.png"
          alt=""
          aria-hidden
          width={1440}
          height={720}
          priority
          draggable={false}
          className="pointer-events-none absolute left-0 top-0 block h-full w-full select-none object-cover object-top"
        />

        <Image
          src="/picture1.png"
          alt=""
          aria-hidden
          width={366}
          height={540}
          priority
          draggable={false}
          className="pointer-events-none absolute left-[58%] top-[6%] h-auto w-[38vw] max-w-[340px] min-w-[160px] -translate-x-1/2 select-none sm:left-[54%] sm:top-[8%] sm:w-[34vw] md:left-[50%] md:top-[10%] md:w-[30vw] lg:left-[46%] lg:top-[12%] lg:w-[min(28vw,360px)]"
        />

        <Image
          src="/picture2.png"
          alt=""
          aria-hidden
          width={562}
          height={458}
          priority
          draggable={false}
          className="pointer-events-none absolute right-0 top-[8%] h-auto w-[52vw] max-w-[520px] min-w-[220px] select-none sm:top-[10%] sm:w-[48vw] md:top-[11%] md:w-[44vw] lg:top-[13%] lg:w-[min(40vw,500px)]"
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
              <HeroButton href="/dashboard/workspace" variant="secondary">
                Смотреть тарифы
              </HeroButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
