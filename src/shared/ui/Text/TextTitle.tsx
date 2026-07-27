export const TextTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={`text-(--foreground) text-sm font-semibold tracking-tight ${className}`}
    >
      {children}
    </h1>
  );
};
