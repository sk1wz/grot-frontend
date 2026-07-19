import Image from "next/image";
import Link from "next/link";

const dropShadow = [
  "12px 12px 50px 0px rgba(62, 60, 75, 0.25)",
  "-12px -12px 20px 0px rgba(255, 255, 255, 1)",
  "-20px -20px 44px 0px rgba(201, 213, 229, 0.8)",
].join(", ");

const insetShadow = [
  "inset 12px 12px 50px 0px rgba(62, 60, 75, 0.25)",
  "inset -12px -12px 24px 0px rgba(255, 255, 255, 0.6)",
  "inset 7px 7px 4px 0px rgba(255, 255, 255, 0.6)",
  "inset -7px -7px 7px 0px rgba(62, 60, 75, 0.3)",
].join(", ");

export const Logo = () => {
  return (
    <Link href="/" className="inline-block shrink-0">
      <span
        className="relative block rounded-[25px]"
        style={{ boxShadow: dropShadow }}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={60}
          height={60}
          priority
          className="rounded-[25px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[25px]"
          style={{ boxShadow: insetShadow }}
        />
      </span>
    </Link>
  );
};
