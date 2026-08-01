"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Copy } from "lucide-react";

export type CopyTextProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onCopy" | "value"
> & {
  value: string;
  children?: ReactNode;
  onCopied?: (value: string) => void;
};

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  textArea.style.left = "-9999px";

  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

export function CopyText({
  value,
  children,
  onCopied,
  className = "",
  type = "button",
  title,
  ...props
}: CopyTextProps) {
  async function handleCopy() {
    await copyToClipboard(value);
    onCopied?.(value);
  }

  return (
    <button
      type={type}
      title={title}
      aria-label={title ?? "Скопировать"}
      onClick={handleCopy}
      className={`group inline-flex min-w-0 cursor-pointer items-center gap-1.5 text-left hover:text-(--accent) ${className}`}
      {...props}
    >
      <Copy
        aria-hidden="true"
        className="size-3.5 shrink-0 opacity-60 group-hover:opacity-100"
      />
      <span className="min-w-0 truncate">{children ?? value}</span>
    </button>
  );
}
