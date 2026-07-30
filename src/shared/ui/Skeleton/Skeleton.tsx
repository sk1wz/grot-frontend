interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-300 before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-shimmer_3s_infinite] before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] dark:before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] ${className}`}
    />
  );
}
