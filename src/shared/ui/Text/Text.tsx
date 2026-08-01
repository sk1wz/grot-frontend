export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <span className={`text-(--foreground) text-xs md:text-sm  ${className}`}>{children}</span>;
};
