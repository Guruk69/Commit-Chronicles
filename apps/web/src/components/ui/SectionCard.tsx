
import type { ReactNode } from "react";
import Card from "./Card";

type SectionCardProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function SectionCard({
  title,
  description,
  action,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-medium">{title}</h2>

          {description && (
            <p className="mt-2 text-sm text-muted">{description}</p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="mt-6">{children}</div>
    </Card>
  );
}
