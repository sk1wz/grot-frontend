"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { Copy } from "lucide-react";

export type CopyTextProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onCopy" | "value"
> & {
  value: string;
  children?: ReactNode;
  copiedTitle?: string;
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
  copiedTitle = "Скопировано",
  onCopied,
  className = "",
  type = "button",
  title,
  ...props
}: CopyTextProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(value);
    setIsCopied(true);
    onCopied?.(value);

    window.setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  }

  return (
    <button
      type={type}
      title={isCopied ? copiedTitle : title}
      aria-label={title ?? "Скопировать"}
      onClick={handleCopy}
      className={`inline-flex min-w-0 cursor-copy items-center gap-1.5 text-left ${className}`}
      {...props}
    >
      <Copy aria-hidden="true" className="size-3.5 shrink-0" />
      <span className="min-w-0 truncate">{children ?? value}</span>
      {isCopied ? (
        <span className="shrink-0 text-xs font-medium text-(--foreground)">
          {copiedTitle}
        </span>
      ) : null}
    </button>
  );
}
