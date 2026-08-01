export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <span className={`text-(--foreground) text-sm md:text-base  ${className}`}>{children}</span>;
};
