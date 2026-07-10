import Image from "next/image";
import { TextTitle } from "@/shared/ui";

export function Checks() {
  return (
    <section className="relative overflow-visible bg-white px-2 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-16 md:px-8 md:pb-32 md:pt-20">
      <div className="relative mx-auto max-w-[1350px]">
        <TextTitle className="text-left md:text-4xl!">
          Доступные проверки
        </TextTitle>

        <div className="relative w-full">
          <Image
            src="/checks.svg"
            alt="ФССП, ГИБДД, банкротства, ИНН по паспорту, ГИС Торги"
            width={1350}
            height={760}
            className="pointer-events-none w-full select-none"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
