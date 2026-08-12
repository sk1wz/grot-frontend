import type { Metadata } from "next";
import Image from "next/image";
import { DashboardPageFrame } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Тарифы",
};

const tariffs = [
  {
    icon: "Icongibdd",
    label: "Запрос о проверке транспортного средства в реестре ГИБДД",
    price: 10,
  },
  {
    icon: "Iconfssp",
    label:
      "Запрос о проверке исполнительных производств физических и юридических лиц",
    price: 10,
  },
  {
    icon: "Iconbankcrupcy",
    label: "Запрос о проверке в реестре сведений о банкротстве",
    price: 10,
  },
  {
    icon: "Icontorgi",
    label: "Запрос о проверке транспортных средств в реестре ГИС Торги",
    price: 10,
  },
  {
    icon: "Icontaxi",
    label: "Отчёт о проверке транспортных средств в реестре ФГИС Такси",
    price: 10,
  },
  { icon: "Iconinn", label: "Запрос о проверке ИНН", price: 10 },
  {
    icon: "Iconinvalid",
    label: "Запрос о проверке транспортных средств в реестре инвалидов",
    price: 10,
  },
  {
    icon: "Iconlocks",
    label: "Запрос о проверке наложения ограничения на транспортные средства",
    price: 10,
  },
  {
    icon: "Iconpriceauto",
    label: "Запрос об оценке стоимости авто",
    price: 10,
  },
] as const;

export default function TariffsPage() {
  return (
    <DashboardPageFrame
      as="main"
      figureSrc="/checksImages/gibdd-figure.png"
      className="relative min-h-full bg-white p-3 text-[#3e3c4b] md:rounded-[70px_10px_70px_10px] md:border-[5px] md:border-[rgba(201,213,229,0.4)] md:p-10"
    >
      <h1 className="mb-[50px] text-[32px] leading-none font-medium max-[700px]:mb-8 max-[700px]:text-[28px]">
        Тарифы
      </h1>
      <section
        className="overflow-hidden rounded-[30px] bg-[#f4f7fa] pt-2 max-[700px]:rounded-[20px]"
        aria-label="Тарифы проверок"
      >
        <div className="grid min-h-[60px] grid-cols-[minmax(0,1fr)_233px] items-center border-b border-[#4fcb91] py-0 pr-10 pl-[100px] text-[20px] font-bold tracking-[0.4px] text-[#4fcb91] uppercase underline max-[700px]:min-h-[52px] max-[700px]:grid-cols-[minmax(0,1fr)_72px] max-[700px]:px-4 max-[700px]:text-[13px]">
          <span>Запрос</span>
          <span className="text-right">Стоимость/шт.</span>
        </div>
        <ul className="m-0 list-none p-0">
          {tariffs.map((tariff) => (
            <li
              className="grid min-h-[68px] grid-cols-[40px_minmax(0,1fr)_233px] items-center border-b border-[#4fcb91] px-10 py-[15px] last:border-b-0 max-[700px]:min-h-16 max-[700px]:grid-cols-[34px_minmax(0,1fr)_72px] max-[700px]:px-4 max-[700px]:py-3"
              key={tariff.icon}
            >
              <Image
                src={`/images/tariff-icons/${tariff.icon}.svg`}
                width={40}
                height={40}
                alt=""
                className="size-10 max-[700px]:size-[34px]"
              />
              <span className="ml-[14px] text-[18px] leading-6 font-semibold text-[#3e3c4b] uppercase max-[700px]:ml-2.5 max-[700px]:text-[13px] max-[700px]:leading-[18px]">
                {tariff.label}
              </span>
              <strong className="text-right text-[24px] font-medium max-[700px]:text-[16px]">
                {tariff.price} ₽
              </strong>
            </li>
          ))}
        </ul>
      </section>
    </DashboardPageFrame>
  );
}
