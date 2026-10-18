import { GitBranch, GitCommit, Clock3 } from "lucide-react";
import { Link } from "react-router";
import RiskBadge from "../ui/RiskBadge";
import Card from "../ui/Card";

export type Repository = {
  id: string;
  name: string;
  description: string;
  branch: string;
  commits: number;
  risk: "high" | "med" | "low";
  lastScan: string;
};

type RepositoryCardProps = {
  repository: Repository;
};

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <Link
      to={`/risk-analysis?repository=${encodeURIComponent(repository.id)}`}
      aria-label={`View risk analysis for ${repository.name}`}
      className="block h-full min-w-0 rounded-lg text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
    >
      <Card className="h-full min-w-0 cursor-pointer transition-all duration-200 hover:border-zinc-500 hover:bg-surface-hover hover:shadow-lg hover:shadow-black/10">
        <div className="flex min-w-0 items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="break-words font-semibold tracking-tight">
              {repository.name}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">
              {repository.description}
            </p>
          </div>

          <RiskBadge level={repository.risk} />
        </div>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <GitBranch size={14} />
            {repository.branch}
          </span>

          <span className="flex items-center gap-1.5">
            <GitCommit size={14} />
            {repository.commits} commits
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted">
          <Clock3 size={14} />
          Last scan: {repository.lastScan}
        </div>
      </Card>
    </Link>
  );
}
