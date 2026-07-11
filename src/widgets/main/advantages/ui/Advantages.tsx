import Image from "next/image";

export function Advantages() {
  return (
    <section className="relative overflow-hidden px-2 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <div className="relative mx-auto max-w-[1350px]">
        <Image
          src="/Rectangle 58.png"
          alt=""
          aria-hidden
          width={340}
          height={380}
          className="pointer-events-none absolute -left-16 top-5 z-0 h-auto w-[220px] -translate-y-1/2 select-none md:-left-1 lg:-left-12 lg:w-[280px] xl:-left-8 xl:w-[320px]"
        />

        <div className="relative z-10 flex origin-center items-center justify-center max-md:scale-[1.28] md:scale-100">
          <Image
            src="/panel advantages.svg"
            alt="Скорость, надежность данных, технологии ИИ"
            width={1100}
            height={290}
            className="pointer-events-none h-auto w-[100vw] max-w-none select-none md:w-full md:max-w-[1200px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
