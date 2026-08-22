"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CheckModule, getCheckPrices, type CheckPrice } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";

const moduleOrder = [CheckModule.GIBDD, CheckModule.FSSP, CheckModule.BANKRUPTCY, CheckModule.GISTORGI, CheckModule.TAXI, CheckModule.INN, CheckModule.LIMITATION];
const moduleIcons: Record<CheckModule, string> = {
  [CheckModule.GIBDD]: "Icongibdd", [CheckModule.GISTORGI]: "Icontorgi", [CheckModule.LIMITATION]: "Iconlocks", [CheckModule.FSSP]: "Iconfssp", [CheckModule.BANKRUPTCY]: "Iconbankcrupcy", [CheckModule.INN]: "Iconinn", [CheckModule.TAXI]: "Icontaxi",
};

export function TariffsPageContent() {
  const [prices, setPrices] = useState<CheckPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getCheckPrices().then(setPrices).catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "Не удалось загрузить цены")).finally(() => setIsLoading(false));
  }, []);

  const orderedPrices = useMemo(() => moduleOrder.flatMap((module) => prices.filter((price) => price.module === module)), [prices]);

  return <DashboardPageFrame figureSrc="/images/tariff.png">
    <h1 className="mb-[50px] text-[32px] leading-none font-medium text-(--foreground) max-[700px]:mb-8 max-[700px]:text-[28px]">Тарифы</h1>
    <section className="overflow-hidden rounded-[30px] bg-[#f4f7fa] pt-2 max-[700px]:rounded-[20px]" aria-label="Тарифы проверок">
      <div className="grid min-h-[60px] grid-cols-[minmax(0,1fr)_233px] items-center border-b border-[#4fcb91] py-0 pr-10 pl-[100px] text-[20px] font-bold tracking-[0.4px] text-[#4fcb91] uppercase underline max-[700px]:min-h-[52px] max-[700px]:grid-cols-[minmax(0,1fr)_72px] max-[700px]:px-4 max-[700px]:text-[13px]"><span>Запрос</span><span className="text-right">Стоимость/шт.</span></div>
      {isLoading ? <p className="px-10 py-8 text-center text-sm text-[#868a85]">Загрузка тарифов…</p> : error ? <p className="px-10 py-8 text-center text-sm text-[#b14b4b]">{error}</p> : <ul className="m-0 list-none p-0">
        {orderedPrices.map((tariff) => <li className="grid min-h-[68px] grid-cols-[40px_minmax(0,1fr)_233px] items-center border-b border-[#4fcb91] px-10 py-[15px] last:border-b-0 max-[700px]:min-h-16 max-[700px]:grid-cols-[34px_minmax(0,1fr)_72px] max-[700px]:px-4 max-[700px]:py-3" key={tariff.module}>
          <Image src={`/images/tariff-icons/${moduleIcons[tariff.module]}.svg`} width={40} height={40} alt="" className="size-10 max-[700px]:size-[34px]" />
          <span className="ml-[14px] text-[18px] leading-6 font-semibold text-[#3e3c4b] uppercase max-[700px]:ml-2.5 max-[700px]:text-[13px] max-[700px]:leading-[18px]">{tariff.description || tariff.title}</span>
          <strong className="text-right text-[24px] font-medium text-[#3e3c4b] max-[700px]:text-[16px]">{tariff.price.toLocaleString("ru-RU")} ₽</strong>
        </li>)}
      </ul>}
    </section>
  </DashboardPageFrame>;
}
