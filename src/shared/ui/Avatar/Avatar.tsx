"use client";

import { useState } from "react";
import Image from "next/image";

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
} as const;

export type AvatarProps = {
  src?: string | null;
  alt: string;
  /** Текст для инициалов, если нет картинки или она не загрузилась */
  fallbackLabel?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
};

function initialsFrom(text: string) {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0];
    const b = parts[1][0];
    if (a && b) return (a + b).toUpperCase();
  }
  const one = parts[0] ?? text;
  return one.slice(0, 2).toUpperCase() || "?";
}

export function Avatar({
  src,
  alt,
  fallbackLabel,
  size = "md",
  className = "",
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;
  const label = fallbackLabel ?? alt;
  const initials = initialsFrom(label);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--accent) text-(--foreground) font-medium ${sizeClasses[size]} ${className}`}
    >
      {showImg ? (
        <Image
          alt={alt}
          fill
          className="size-full object-cover"
          onError={() => setFailed(true)}
          src={src!}
          sizes="48px"
        />
      ) : (
        <span aria-hidden>{initials}</span>
      )}
    </span>
  );
}
