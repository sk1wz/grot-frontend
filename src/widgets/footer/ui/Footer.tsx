import Image from "next/image";

export function Footer() {
  return (
    <div className="relative -mt-20 sm:-mt-28 md:-mt-36">
      <Image
        src="/Rectangle 159.png"
        alt=""
        aria-hidden
        width={320}
        height={320}
        className="pointer-events-none absolute -right-8 -top-24 z-0 h-auto w-[160px] select-none sm:-right-4 sm:-top-32 sm:w-[200px] md:-top-40 md:w-[260px] lg:right-0 lg:w-[320px]"
      />

      <footer className="relative z-10 rounded-t-2xl bg-[#D4DDEA]/75 backdrop-blur-sm">
        <div className="relative z-10 flex flex-col items-center px-4 py-12 text-center sm:py-14 md:py-16">
          <p className="text-2xl font-bold text-[#3e3c4b] sm:text-3xl">
            InfoFusion
          </p>

          <a
            href="mailto:info@infofusion.ru"
            className="mt-4 text-base font-medium text-[#3e3c4b] transition-opacity hover:opacity-70 sm:text-lg"
          >
            info@infofusion.ru
          </a>

          <a
            href="tel:+78000000000"
            className="mt-2 text-base font-medium text-[#3e3c4b] transition-opacity hover:opacity-70 sm:text-lg"
          >
            +7 (800) 000-00-00
          </a>
        </div>
      </footer>
    </div>
  );
}
