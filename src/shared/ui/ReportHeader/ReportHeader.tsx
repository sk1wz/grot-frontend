"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "@/shared/api/config";

type ReportHeaderProps = {
  backHref: string;
  reportId: string;
};

export function ReportHeader({ backHref, reportId }: ReportHeaderProps) {
  const [downloadingFormat, setDownloadingFormat] = useState<
    "pdf" | "excel" | null
  >(null);

  async function downloadReport(format: "pdf" | "excel") {
    setDownloadingFormat(format);

    try {
      const response = await fetch(
        `${baseURL}/checks/report/${format}/${reportId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Не удалось скачать отчёт");

      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = `report-${reportId}.${format === "pdf" ? "pdf" : "xlsx"}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Не удалось скачать отчёт"
      );
    } finally {
      setDownloadingFormat(null);
    }
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3 text-xs sm:h-[52px] sm:gap-5 sm:pl-4">
      <Link
        href={backHref}
        className="inline-flex w-full items-center gap-1.5 font-bold text-(--foreground) no-underline sm:w-auto"
      >
        <ArrowLeft size={18} strokeWidth={2} />
        Вернуться назад
      </Link>
      <button
        type="button"
        disabled={downloadingFormat !== null}
        onClick={() => downloadReport("pdf")}
        className="inline-flex cursor-pointer whitespace-nowrap items-center gap-2 rounded-[20px] bg-[#c8ced5] px-3 py-3 text-xs font-bold text-[#1f2937] uppercase shadow-(--shadow-1) disabled:cursor-not-allowed disabled:opacity-60 sm:gap-3 sm:px-[18px] sm:py-[18px]"
      >
        <span>{downloadingFormat === "pdf" ? "Скачивание..." : "Скачать"}</span>
        <span className="rounded border border-[#697a80] bg-[#c5ddd5] px-1 py-0.5 text-sm font-medium leading-none text-[#46565c]">
          PDF
        </span>
      </button>
      <button
        type="button"
        disabled={downloadingFormat !== null}
        onClick={() => downloadReport("excel")}
        className="inline-flex cursor-pointer whitespace-nowrap items-center gap-2 rounded-[20px] bg-[#c8ced5] px-3 py-3 text-xs font-bold text-[#1f2937] uppercase shadow-(--shadow-1) disabled:cursor-not-allowed disabled:opacity-60 sm:gap-3 sm:px-[18px] sm:py-[18px]"
      >
        <span>
          {downloadingFormat === "excel" ? "Скачивание..." : "Скачать"}
        </span>
        <span className="rounded border border-[#697a80] bg-[#c5ddd5] px-1 py-0.5 text-sm font-medium leading-none text-[#46565c]">
          XLSX
        </span>
      </button>
    </div>
  );
}
