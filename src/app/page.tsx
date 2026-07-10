import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
      <section className="relative w-full h-full max-h-[660px]">
        <Image
          src="/Group 3.png"
          alt=""
          aria-hidden
          width={1440}
          height={720}
          priority
          draggable={false}
          className="pointer-events-none absolute left-0 block h-full w-full select-none object-cover"
        />

        <div className="relative z-10 flex items-center justify-between p-4 max-w-[1350px] mx-auto">
          <Image
            src="/logo.png"
            alt="InfoFusion logo"
            width={120}
            height={120}
            priority
          />

          <Link
            href="/login"
            className="rounded-xl bg-[#C8DDD5] px-4 py-3 text-sm text-center font-semibold text-[#3E3C4B] bg-linear-to-t from-[#C8DDD5] to-[#F3F3F3] shadow"
          >
            ЛИЧНЫЙ КАБИНЕТ
          </Link>
        </div>
      </section>
    </main>
  );
}
