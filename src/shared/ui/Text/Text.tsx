export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <span className={`text-(--foreground) ${className}`}>{children}</span>;
};
