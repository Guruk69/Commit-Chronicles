
import type { LucideIcon } from "lucide-react";
import Card from "./Card";

type MetricCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon?: LucideIcon;
};

export default function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted">{title}</p>

        {Icon && (
          <Icon
            size={18}
            className="shrink-0 text-muted"
            aria-hidden="true"
          />
        )}
      </div>

      <p className="mt-4 text-2xl font-semibold tabular-nums">
        {value}
      </p>

      <p className="mt-2 text-xs text-muted">{description}</p>
    </Card>
  );
}
