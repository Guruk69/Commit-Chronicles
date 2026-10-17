
type RiskLevel = "high" | "medium" | "low";

type RiskBadgeProps = {
  level: RiskLevel;
};

const styles: Record<RiskLevel, string> = {
  high: "border-red-500/30 bg-red-500/10 text-red-400",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  low: "border-green-500/30 bg-green-500/10 text-green-400",
};

export default function RiskBadge({ level }: RiskBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${styles[level]}`}
    >
      {level} risk
    </span>
  );
}
