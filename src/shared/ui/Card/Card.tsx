export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`bg-(--surface) ${className}`}>{children}</div>;
};
