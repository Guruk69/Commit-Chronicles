
import { CheckCircle2, Clock3, LoaderCircle, XCircle } from "lucide-react";

type ScanState = "completed" | "running" | "failed" | "queued";

type ScanStatusProps = {
  status: ScanState;
};

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "border-green-500/30 bg-green-500/10 text-green-400",
  },
  running: {
    label: "Running",
    icon: LoaderCircle,
    className: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "border-red-500/30 bg-red-500/10 text-red-400",
  },
  queued: {
    label: "Queued",
    icon: Clock3,
    className: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  },
} satisfies Record<
  ScanState,
  {
    label: string;
    icon: typeof CheckCircle2;
    className: string;
  }
>;

export default function ScanStatus({ status }: ScanStatusProps) {
  const { label, icon: Icon, className } = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      <Icon
        size={13}
        className={status === "running" ? "animate-spin" : ""}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
