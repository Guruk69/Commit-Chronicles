
type RiskProgressProps = {
  score: number;
};

export default function RiskProgress({ score }: RiskProgressProps) {
  const safeScore = Math.min(100, Math.max(0, score));

  const color =
    safeScore >= 70
      ? "bg-risk-high"
      : safeScore >= 40
        ? "bg-risk-medium"
        : "bg-risk-low";

  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-surface-hover"
        role="progressbar"
        aria-label="Risk score"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeScore}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${safeScore}%` }}
        />
      </div>

      <span className="w-10 text-right text-xs tabular-nums text-muted">
        {safeScore}%
      </span>
    </div>
  );
}
