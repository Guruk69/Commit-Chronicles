
import type { HTMLAttributes } from "react";

type PageContainerProps = HTMLAttributes<HTMLElement>;

export default function PageContainer({
  className = "",
  ...props
}: PageContainerProps) {
  return (
    <section
      className={`mx-auto w-full max-w-[1600px] min-w-0 ${className}`}
      {...props}
    />
  );
}
