import type { ReactNode } from "react";
import Image from "next/image";

type DashboardPageFrameProps = {
  as?: "div" | "main" | "section";
  children: ReactNode;
  figureSrc?: string;
  figureClassName?: string;
  figurePriority?: boolean;
  className?: string;
  wrapperClassName?: string;
};

const defaultFrameClassName =
  "relative md:rounded-[70px_10px_70px_10px] md:border-4 md:border-[#d7e2ed] md:bg-white md:p-8";

export function DashboardPageFrame({
  as: Content = "div",
  children,
  figureSrc,
  figureClassName = "pointer-events-none fixed top-0 right-0 select-none",
  figurePriority = false,
  className = defaultFrameClassName,
  wrapperClassName = "relative",
}: DashboardPageFrameProps) {
  return (
    <div className={wrapperClassName}>
      {figureSrc && (
        <Image
          src={figureSrc}
          width={300}
          height={200}
          alt=""
          loading={figurePriority ? undefined : "eager"}
          priority={figurePriority}
          className={figureClassName}
        />
      )}

      <Content className={className}>{children}</Content>
    </div>
  );
}
