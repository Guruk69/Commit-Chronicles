
type RiskLevel = "high" | "med" | "low";

type RiskBadgeProps = {
  level: RiskLevel;
};

const styles: Record<RiskLevel, string> = {
  high: "border-red-500/30 bg-red-500/10 text-red-400",
  med: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  low: "border-green-500/30 bg-green-500/10 text-green-400",
};

export default function RiskBadge({ level }: RiskBadgeProps) {
  return (
    <span
      className={`inline-flex w-[88px] shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-2 py-1.5 text-xs font-medium capitalize ${styles[level]}`}
    >
      {level === "med" ? "Med" : level === "high" ? "High" : "Low"} Risk
    </span>
  );
}
