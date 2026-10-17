
import type { LucideIcon } from "lucide-react";
import { FolderOpen } from "lucide-react";
import Button from "./Button";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  description,
  icon: Icon = FolderOpen,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-12 text-center">
      <div className="mb-4 rounded-lg border border-border bg-surface-hover p-3">
        <Icon size={24} className="text-muted" aria-hidden="true" />
      </div>

      <h3 className="text-base font-medium">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
