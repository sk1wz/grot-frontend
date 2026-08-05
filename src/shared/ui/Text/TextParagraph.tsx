export type TextParagraphProps = React.ComponentPropsWithoutRef<"p">;

export function TextParagraph({ className = "", ...props }: TextParagraphProps) {
  return <p className={`text-(--foreground) text-xs sm:text-sm ${className}`} {...props} />;
}
