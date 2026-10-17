
import { ShieldCheck, ShieldAlert, Activity } from "lucide-react";
import Card from "../ui/Card";
import RiskProgress from "../ui/RiskProgress";

type RepositoryHealthProps = {
  healthScore: number;
  highRiskFiles: number;
  analyzedFiles: number;
};

export default function RepositoryHealth({
  healthScore,
  highRiskFiles,
  analyzedFiles,
}: RepositoryHealthProps) {
  const safeScore = Math.min(100, Math.max(0, healthScore));

  const healthLabel =
    safeScore >= 80
      ? "Healthy"
      : safeScore >= 50
        ? "Needs attention"
        : "At risk";

  const HealthIcon =
    safeScore >= 80
      ? ShieldCheck
      : safeScore >= 50
        ? Activity
        : ShieldAlert;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-medium">Repository Health</h2>
          <p className="mt-2 text-sm text-muted">
            Summary of the current codebase risk profile.
          </p>
        </div>

        <HealthIcon size={20} className="shrink-0 text-muted" />
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-semibold tabular-nums">
              {safeScore}
              <span className="text-lg text-muted">/100</span>
            </p>
            <p className="mt-1 text-sm text-muted">{healthLabel}</p>
          </div>
        </div>

        <div className="mt-4">
          <RiskProgress score={100 - safeScore} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <p className="text-sm text-muted">High-risk files</p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            {highRiskFiles}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted">Files analyzed</p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            {analyzedFiles.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
